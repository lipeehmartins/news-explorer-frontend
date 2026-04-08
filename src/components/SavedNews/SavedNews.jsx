import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Footer from "../Footer/Footer";
import "./SavedNews.css";

function SavedNews({
  articles,
  onLoginClick,
  isLoggedIn,
  onLogout,
  onToggleSaveArticle,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
      <main className="saved-news">
        <SavedNewsHeader articles={articles} />

        {articles.length > 0 ? (
          <section
            className="saved-news__content"
            aria-label="Lista de artigos salvos"
          >
            <NewsCardList
              articles={articles}
              allArticlesCount={articles.length}
              visibleCount={articles.length}
              isSavedPage
              onToggleSaveArticle={onToggleSaveArticle}
              savedUrlSet={new Set(articles.map((article) => article.link))}
              isLoggedIn={isLoggedIn}
            />
          </section>
        ) : (
          <p className="saved-news__empty">
            Você ainda não salvou nenhum artigo.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedNews;
