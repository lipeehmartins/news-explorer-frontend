import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

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
          <li
            className="news-card-list__item"
            key={
              article._id ||
              `${article.link}-${article.publishedAt || article.date}`
            }
          >
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
        <button
          className="news-card-list__more"
          type="button"
          onClick={onShowMore}
        >
          <span className="news-card-list__more-text">Mostrar mais</span>
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
