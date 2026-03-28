import { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {
  API_ERROR_MESSAGE,
  LOCAL_STORAGE_SAVED_KEY,
  LOCAL_STORAGE_SEARCH_KEY,
  RESULTS_STEP,
} from '../../utils/constants';
import { searchNews } from '../../utils/newsApi';
import './App.css';

const getInitialSearchState = () => {
  const savedSearch = localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY);

  if (!savedSearch) {
    return {
      articles: [],
      searchKeyword: '',
      hasSearched: false,
      visibleCount: RESULTS_STEP,
    };
  }

  try {
    const parsed = JSON.parse(savedSearch);
    return {
      articles: parsed.articles || [],
      searchKeyword: parsed.searchKeyword || '',
      hasSearched: Boolean(parsed.hasSearched),
      visibleCount: parsed.visibleCount || RESULTS_STEP,
    };
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_SEARCH_KEY);
    return {
      articles: [],
      searchKeyword: '',
      hasSearched: false,
      visibleCount: RESULTS_STEP,
    };
  }
};

const getInitialSavedArticles = () => {
  const savedItems = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);

  if (!savedItems) {
    return [];
  }

  try {
    const parsed = JSON.parse(savedItems);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_SAVED_KEY);
    return [];
  }
};

function App() {
  const initialSearchState = getInitialSearchState();

  const [articles, setArticles] = useState(initialSearchState.articles);
  const [savedArticles, setSavedArticles] = useState(getInitialSavedArticles);
  const [searchKeyword, setSearchKeyword] = useState(initialSearchState.searchKeyword);
  const [hasSearched, setHasSearched] = useState(initialSearchState.hasSearched);
  const [visibleCount, setVisibleCount] = useState(initialSearchState.visibleCount);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [activeModal, setActiveModal] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('Usuário');

  useEffect(() => {
    const payload = {
      articles,
      searchKeyword,
      hasSearched,
      visibleCount,
    };

    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(payload));
  }, [articles, searchKeyword, hasSearched, visibleCount]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(savedArticles));
  }, [savedArticles]);

  const savedUrlSet = useMemo(
    () => new Set(savedArticles.map((article) => article.link)),
    [savedArticles],
  );

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setRequestError('');
    setHasSearched(true);
    setSearchKeyword(keyword);
    setVisibleCount(RESULTS_STEP);

    searchNews(keyword)
      .then((data) => {
        setArticles(data);
      })
      .catch(() => {
        setRequestError(API_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowMore = () => {
    setVisibleCount((prevValue) => prevValue + RESULTS_STEP);
  };

  const openLoginModal = () => {
    setActiveModal('login');
  };

  const openRegisterModal = () => {
    setActiveModal('register');
  };

  const closeModal = () => {
    setActiveModal('');
  };

  const handleLogin = (values) => {
    setIsLoggedIn(true);
    setCurrentUserName(values.name || 'Usuário');
    closeModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserName('Usuário');
  };

  const toggleSaveArticle = (article) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    const alreadySaved = savedUrlSet.has(article.link);

    if (alreadySaved) {
      setSavedArticles((prevItems) => prevItems.filter((item) => item.link !== article.link));
      return;
    }

    setSavedArticles((prevItems) => [article, ...prevItems]);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              articles={visibleArticles}
              allArticlesCount={articles.length}
              hasSearched={hasSearched}
              isLoading={isLoading}
              requestError={requestError}
              searchKeyword={searchKeyword}
              visibleCount={visibleCount}
              onSearch={handleSearch}
              onShowMore={handleShowMore}
              onLoginClick={openLoginModal}
              isLoggedIn={isLoggedIn}
              currentUserName={currentUserName}
              onLogout={handleLogout}
              onToggleSaveArticle={toggleSaveArticle}
              savedUrlSet={savedUrlSet}
            />
          )}
        />
        <Route
          path="/saved-news"
          element={(
            <SavedNews
              articles={savedArticles}
              onLoginClick={openLoginModal}
              isLoggedIn={isLoggedIn}
              currentUserName={currentUserName}
              onLogout={handleLogout}
              onToggleSaveArticle={toggleSaveArticle}
            />
          )}
        />
      </Routes>

      <Login
        isOpen={activeModal === 'login'}
        onClose={closeModal}
        onSubmit={handleLogin}
        onSwitchToRegister={openRegisterModal}
      />
      <Register
        isOpen={activeModal === 'register'}
        onClose={closeModal}
        onSubmit={handleLogin}
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
}

export default App;
