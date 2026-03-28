import { getDateRangeFromLastWeek } from './date';

const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL || 'https://newsapi.org/v2';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const checkResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`Erro da API: ${response.status}`));
  }

  return response.json();
};

const normalizeArticle = (article, keyword) => ({
  keyword,
  title: article.title || 'Sem título',
  description: article.description || 'Sem descrição disponível.',
  publishedAt: article.publishedAt,
  source: article.source?.name || 'Fonte desconhecida',
  link: article.url,
  image: article.urlToImage || 'https://placehold.co/600x400?text=Sem+Imagem',
});

export const searchNews = (keyword) => {
  if (!NEWS_API_KEY) {
    return Promise.reject(new Error('Chave da News API não configurada'));
  }

  const { from, to } = getDateRangeFromLastWeek();
  const query = new URLSearchParams({
    q: keyword,
    from,
    to,
    pageSize: '100',
    apiKey: NEWS_API_KEY,
  });

  return fetch(`${NEWS_API_BASE_URL}/everything?${query.toString()}`)
    .then(checkResponse)
    .then((data) => (data.articles || []).map((article) => normalizeArticle(article, keyword)));
};
