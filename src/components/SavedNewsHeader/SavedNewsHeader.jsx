import './SavedNewsHeader.css';

function getKeywordsSummary(articles) {
  const map = new Map();

  articles.forEach((article) => {
    const key = article.keyword || 'Sem palavra-chave';
    map.set(key, (map.get(key) || 0) + 1);
  });

  const sortedKeys = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  if (sortedKeys.length === 0) {
    return 'Nenhuma palavra-chave ainda';
  }

  if (sortedKeys.length <= 3) {
    return sortedKeys.join(', ');
  }

  const remaining = sortedKeys.length - 2;
  return `${sortedKeys[0]}, ${sortedKeys[1]} e mais ${remaining}`;
}

function SavedNewsHeader({ currentUserName, articles }) {
  return (
    <section className="saved-news-header" aria-label="Resumo de artigos salvos">
      <p className="saved-news-header__subtitle">Artigos salvos</p>
      <h1 className="saved-news-header__title">
        {currentUserName}, você tem {articles.length} artigo(s) salvo(s)
      </h1>
      <p className="saved-news-header__keywords">
        Por palavras-chave: <strong>{getKeywordsSummary(articles)}</strong>
      </p>
    </section>
  );
}

export default SavedNewsHeader;