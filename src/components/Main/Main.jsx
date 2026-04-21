import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main({
  articles,
  allArticlesCount,
  hasSearched,
  isLoading,
  requestError,
  searchKeyword,
  visibleCount,
  onSearch,
  onShowMore,
  onLoginClick,
  isLoggedIn,
  onLogout,
  onToggleSaveArticle,
  savedUrlSet,
}) {
  const hasResults = !isLoading && !requestError && allArticlesCount > 0;
  const isNotFound =
    hasSearched && !isLoading && !requestError && allArticlesCount === 0;

  return (
    <>
      <main className="main">
        <section className="main__intro" aria-label="Busca de notícias">
          <Header
            isHome
            isLoggedIn={isLoggedIn}
            onLoginClick={onLoginClick}
            onLogout={onLogout}
          />

          <div className="main__intro-content">
            <h1 className="main__title">
              O que está <br />
              acontecendo no mundo?
            </h1>
            <p className="main__subtitle">
              Encontre as notícias mais recentes sobre qualquer tema e salve-as
              em sua conta pessoal.
            </p>
            <SearchForm onSearch={onSearch} initialValue={searchKeyword} />
          </div>
        </section>

        {(hasSearched || isLoading) && (
          <section className="main__results" aria-label="Resultados da busca">
            {hasResults && (
              <h2 className="main__results-title">Procurar resultados</h2>
            )}

            {isLoading && (
              <div className="main__status">
                <Preloader text="Procurando notícias..." />
              </div>
            )}

            {requestError && (
              <p className="main__feedback main__feedback_type_error">
                {requestError}
              </p>
            )}

            {isNotFound && (
              <div className="main__status main__status_type_empty">
                <span className="main__not-found-icon" aria-hidden="true" />
                <h3 className="main__not-found-title">Nada encontrado</h3>
                <p className="main__not-found-text">
                  Desculpe, mas nada corresponde aos seus termos de pesquisa.
                </p>
              </div>
            )}

            {hasResults && (
              <NewsCardList
                articles={articles}
                allArticlesCount={allArticlesCount}
                visibleCount={visibleCount}
                onShowMore={onShowMore}
                onToggleSaveArticle={onToggleSaveArticle}
                savedUrlSet={savedUrlSet}
                isLoggedIn={isLoggedIn}
              />
            )}
          </section>
        )}
      </main>
      <About />
      <Footer />
    </>
  );
}

export default Main;
