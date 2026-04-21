import { getDateRangeFromLastWeek } from "./date";

const DEFAULT_BACKEND_API_BASE_URL = import.meta.env.PROD
  ? "https://news-explorer-backend-xu1z.onrender.com/api"
  : "http://localhost:3000/api";
const DEFAULT_NEWS_API_BASE_URL = "https://newsapi.org";

const configuredBackendBaseUrl =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_BACKEND_API_BASE_URL;
const NEWS_PROXY_BASE_URL = configuredBackendBaseUrl.replace(/\/+$/, "");

const normalizeNewsApiBaseUrl = (rawBaseUrl) => {
  const withoutTrailingSlashes = rawBaseUrl.replace(/\/+$/, "");

  if (withoutTrailingSlashes.endsWith("/everything")) {
    return withoutTrailingSlashes.replace(/\/everything$/, "");
  }

  if (withoutTrailingSlashes.endsWith("/v2")) {
    return withoutTrailingSlashes;
  }

  return `${withoutTrailingSlashes}/v2`;
};

const configuredNewsBaseUrl =
  import.meta.env.VITE_NEWS_API_BASE_URL || DEFAULT_NEWS_API_BASE_URL;
const NEWS_API_BASE_URL = normalizeNewsApiBaseUrl(configuredNewsBaseUrl);
const NEWS_API_KEY = (import.meta.env.VITE_NEWS_API_KEY || "").trim();

const IS_PROD = import.meta.env.PROD;

const checkResponse = async (response) => {
  if (!response.ok) {
    let message = `Erro da API: ${response.status}`;

    try {
      const data = await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Keep default message when body is not JSON.
    }

    throw new Error(message);
  }

  return response.json();
};

const normalizeArticle = (article, keyword) => ({
  keyword,
  title: article.title || "Sem título",
  description: article.description || "Sem descrição disponível.",
  publishedAt: article.publishedAt,
  source: article.source?.name || "Fonte desconhecida",
  link: article.url,
  image: article.urlToImage || "https://placehold.co/600x400?text=Sem+Imagem",
});

export const searchNews = (keyword) => {
  const { from, to } = getDateRangeFromLastWeek();

  if (IS_PROD) {
    const query = new URLSearchParams({
      q: keyword,
      from,
      to,
      pageSize: "100",
    });

    return fetch(`${NEWS_PROXY_BASE_URL}/news?${query.toString()}`)
      .then(checkResponse)
      .then((data) => data.articles || []);
  }

  if (!NEWS_API_KEY) {
    return Promise.reject(
      new Error(
        "A chave da News API não está configurada para desenvolvimento. Defina VITE_NEWS_API_KEY no frontend.",
      ),
    );
  }

  const query = new URLSearchParams({
    q: keyword,
    apiKey: NEWS_API_KEY,
    from,
    to,
    pageSize: "100",
  });

  return fetch(`${NEWS_API_BASE_URL}/everything?${query.toString()}`)
    .then(checkResponse)
    .then((data) =>
      (data.articles || []).map((article) => normalizeArticle(article, keyword)),
    );
};
