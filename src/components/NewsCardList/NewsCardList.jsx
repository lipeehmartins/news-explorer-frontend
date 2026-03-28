import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  articles,
  allArticlesCount,
  visibleCount,
  onShowMore,
  onToggleSaveArticle,
  savedUrlSet,
  isLoggedIn,
  isSavedPage = false,
}) {
  const shouldShowMoreButton = !isSavedPage && visibleCount < allArticlesCount;

  return (
    <section className="news-card-list" aria-label="Lista de notícias">
      <ul className="news-card-list__grid">
        {articles.map((article) => (
          <li className="news-card-list__item" key={`${article.link}-${article.publishedAt}`}>
            <NewsCard
              article={article}
              isSaved={savedUrlSet.has(article.link)}
              isLoggedIn={isLoggedIn}
              isSavedPage={isSavedPage}
              onToggleSave={onToggleSaveArticle}
            />
          </li>
        ))}
      </ul>

      {shouldShowMoreButton && (
        <button className="news-card-list__more" type="button" onClick={onShowMore}>
          Mostrar mais
        </button>
      )}
    </section>
  );
}

export default NewsCardList;