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
  currentUserName,
  onLogout,
  onToggleSaveArticle,
  savedUrlSet,
}) {
  const isNotFound =
    hasSearched && !isLoading && !requestError && allArticlesCount === 0;

  return (
    <>
      <main className="main">
        <section className="main__intro" aria-label="Busca de notícias">
          <Header
            isHome
            isLoggedIn={isLoggedIn}
            currentUserName={currentUserName}
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
            <h2 className="main__results-title">Procurar resultados</h2>

            {isLoading && <Preloader text="Buscando notícias..." />}

            {requestError && (
              <p className="main__feedback main__feedback_type_error">
                {requestError}
              </p>
            )}

            {isNotFound && <p className="main__feedback">Nada encontrado</p>}

            {!isLoading && !requestError && allArticlesCount > 0 && (
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
