import { formatBrazilianDate } from "../../utils/date";
import "./NewsCard.css";

function NewsCard({
  article,
  isSaved,
  isLoggedIn,
  onToggleSave,
  isSavedPage = false,
}) {
  const publishedDate = article.publishedAt || article.date;
  const description =
    article.description || article.text || "Sem descrição disponível.";
  const saveButtonText = isSavedPage ? "Remover artigo salvo" : "Salvar artigo";
  const saveButtonClassName = `news-card__action ${
    isSaved ? "news-card__action_state_saved" : ""
  } ${isSavedPage ? "news-card__action_type_delete" : "news-card__action_type_bookmark"}`;

  return (
    <article className="news-card">
      {article.keyword && (
        <span className="news-card__keyword">{article.keyword}</span>
      )}

      <div className="news-card__media-wrapper">
        <a
          className="news-card__link"
          href={article.link}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="news-card__image"
            src={article.image}
            alt={article.title || "Imagem da notícia"}
            loading="lazy"
          />
        </a>

        <button
          className={saveButtonClassName}
          type="button"
          aria-label={saveButtonText}
          title={
            !isLoggedIn && !isSavedPage
              ? "Faça o login para salvar os artigos."
              : saveButtonText
          }
          onClick={() => onToggleSave(article)}
        >
          {isSavedPage ? (
            "🗑"
          ) : (
            <span className="news-card__bookmark-icon" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="news-card__content">
        <time className="news-card__date" dateTime={publishedDate}>
          {formatBrazilianDate(publishedDate)}
        </time>
        <h3 className="news-card__title">
          <a
            className="news-card__link"
            href={article.link}
            target="_blank"
            rel="noreferrer"
          >
            {article.title}
          </a>
        </h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
