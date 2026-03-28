import { formatBrazilianDate } from '../../utils/date';
import './NewsCard.css';

function NewsCard({ article, isSaved, isLoggedIn, onToggleSave, isSavedPage = false }) {
  const saveButtonText = isSavedPage ? 'Remover artigo salvo' : 'Salvar artigo';
  const saveButtonClassName = `news-card__action ${
    isSaved ? 'news-card__action_state_saved' : ''
  } ${isSavedPage ? 'news-card__action_type_delete' : ''}`;

  return (
    <article className="news-card">
      {article.keyword && <span className="news-card__keyword">{article.keyword}</span>}

      <div className="news-card__media-wrapper">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title || 'Imagem da notícia'}
          loading="lazy"
        />

        <button
          className={saveButtonClassName}
          type="button"
          aria-label={saveButtonText}
          title={!isLoggedIn && !isSavedPage ? 'Faça o login para salvar os artigos.' : saveButtonText}
          onClick={() => onToggleSave(article)}
        >
          {isSavedPage ? '🗑' : '★'}
        </button>
      </div>

      <div className="news-card__content">
        <time className="news-card__date" dateTime={article.publishedAt}>
          {formatBrazilianDate(article.publishedAt)}
        </time>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description || 'Sem descrição disponível.'}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;