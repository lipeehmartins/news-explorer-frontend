const DEFAULT_API_BASE_URL = import.meta.env.PROD
  ? "https://news-explorer-backend-xu1z.onrender.com/api"
  : "http://localhost:3000/api";

const configuredBaseUrl =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

const checkResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }

  let message = `Erro da API: ${response.status}`;

  try {
    const data = await response.json();
    if (data?.message) {
      message = data.message;
    }
  } catch {
    // Keep the default error message when API body is not JSON.
  }

  throw new Error(message);
};

const request = (path, options = {}) =>
  fetch(`${BASE_URL}${path}`, options).then(checkResponse);

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const register = ({ email, password, name }) =>
  request("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

export const authorize = ({ email, password }) =>
  request("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const getCurrentUser = (token) =>
  request("/users/me", {
    method: "GET",
    headers: getAuthHeaders(token),
  });

export const getArticles = (token) =>
  request("/articles", {
    method: "GET",
    headers: getAuthHeaders(token),
  });

export const createArticle = (token, article) =>
  request("/articles", {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(article),
  });

export const deleteArticle = (token, articleId) =>
  request(`/articles/${articleId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

export const normalizeArticleFromApi = (article) => ({
  _id: article._id,
  keyword: article.keyword,
  title: article.title,
  description: article.text,
  publishedAt: article.date,
  source: article.source,
  link: article.link,
  image: article.image,
});

export const mapArticleToApiPayload = (article) => ({
  keyword: article.keyword,
  title: article.title,
  text: article.description,
  date: article.publishedAt,
  source: article.source,
  link: article.link,
  image: article.image,
});
