import { useCallback, useEffect, useMemo, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AuthSuccess from "../AuthSuccess/AuthSuccess";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  API_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  LOCAL_STORAGE_SEARCH_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
  RESULTS_STEP,
  SAVE_ERROR_MESSAGE,
} from "../../utils/constants";
import { searchNews } from "../../utils/newsApi";
import {
  authorize,
  createArticle,
  deleteArticle,
  getArticles,
  getCurrentUser,
  mapArticleToApiPayload,
  normalizeArticleFromApi,
  register,
} from "../../utils/mainApi";
import "./App.css";

const getInitialSearchState = () => {
  const savedSearch = localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY);

  if (!savedSearch) {
    return {
      articles: [],
      searchKeyword: "",
      hasSearched: false,
      visibleCount: RESULTS_STEP,
    };
  }

  try {
    const parsed = JSON.parse(savedSearch);
    return {
      articles: parsed.articles || [],
      searchKeyword: parsed.searchKeyword || "",
      hasSearched: Boolean(parsed.hasSearched),
      visibleCount: parsed.visibleCount || RESULTS_STEP,
    };
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_SEARCH_KEY);
    return {
      articles: [],
      searchKeyword: "",
      hasSearched: false,
      visibleCount: RESULTS_STEP,
    };
  }
};

function App() {
  const history = useHistory();
  const initialSearchState = getInitialSearchState();

  const [articles, setArticles] = useState(initialSearchState.articles);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(
    initialSearchState.searchKeyword,
  );
  const [hasSearched, setHasSearched] = useState(
    initialSearchState.hasSearched,
  );
  const [visibleCount, setVisibleCount] = useState(
    initialSearchState.visibleCount,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const payload = {
      articles,
      searchKeyword,
      hasSearched,
      visibleCount,
    };

    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(payload));
  }, [articles, searchKeyword, hasSearched, visibleCount]);

  const restoreSession = useCallback(
    (token) =>
      Promise.all([getCurrentUser(token), getArticles(token)]).then(
        ([user, saved]) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          setSavedArticles(saved.map(normalizeArticleFromApi));
        },
      ),
    [],
  );

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (!token) {
      return;
    }

    restoreSession(token).catch(() => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      setIsLoggedIn(false);
      setCurrentUser(null);
      setSavedArticles([]);
    });
  }, [restoreSession]);

  const savedArticleMap = useMemo(
    () => new Map(savedArticles.map((article) => [article.link, article])),
    [savedArticles],
  );

  const savedUrlSet = useMemo(
    () => new Set(savedArticleMap.keys()),
    [savedArticleMap],
  );

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setRequestError("");
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
    setAuthError("");
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const openSuccessModal = () => {
    setAuthError("");
    setActiveModal("success");
  };

  const closeModal = () => {
    setAuthError("");
    setActiveModal("");
  };

  const handleLogin = (values) => {
    setIsAuthLoading(true);
    setAuthError("");

    authorize(values)
      .then((data) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
        return restoreSession(data.token);
      })
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        setAuthError(error.message || AUTH_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleRegister = (values) => {
    setIsAuthLoading(true);
    setAuthError("");

    register(values)
      .then(() => {
        openSuccessModal();
      })
      .catch((error) => {
        const conflictMessage = (error.message || "").toLowerCase();

        if (
          conflictMessage.includes("cadastrado") ||
          conflictMessage.includes("conflito")
        ) {
          setAuthError("Este e-mail nao está disponível");
          return;
        }

        setAuthError(error.message || AUTH_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
    history.push("/");
  };

  const toggleSaveArticle = (article) => {
    if (!isLoggedIn) {
      openRegisterModal();
      return;
    }

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (!token) {
      openLoginModal();
      return;
    }

    const existingSavedArticle = savedArticleMap.get(article.link);

    if (existingSavedArticle) {
      deleteArticle(token, existingSavedArticle._id)
        .then(() => {
          setSavedArticles((prevItems) =>
            prevItems.filter((item) => item._id !== existingSavedArticle._id),
          );
        })
        .catch(() => {
          setRequestError(SAVE_ERROR_MESSAGE);
        });

      return;
    }

    createArticle(token, mapArticleToApiPayload(article))
      .then((savedArticle) => {
        setSavedArticles((prevItems) => [
          normalizeArticleFromApi(savedArticle),
          ...prevItems,
        ]);
      })
      .catch(() => {
        setRequestError(SAVE_ERROR_MESSAGE);
      });
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
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
              onLogout={handleLogout}
              onToggleSaveArticle={toggleSaveArticle}
              savedUrlSet={savedUrlSet}
            />
          </Route>

          <ProtectedRoute
            path="/saved-news"
            isLoggedIn={isLoggedIn}
            onUnauthorized={openLoginModal}
          >
            <SavedNews
              articles={savedArticles}
              onLoginClick={openLoginModal}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onToggleSaveArticle={toggleSaveArticle}
            />
          </ProtectedRoute>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

        <Login
          isOpen={activeModal === "login"}
          onClose={closeModal}
          onSubmit={handleLogin}
          onSwitchToRegister={openRegisterModal}
          isLoading={isAuthLoading}
          submitError={authError}
        />
        <Register
          isOpen={activeModal === "register"}
          onClose={closeModal}
          onSubmit={handleRegister}
          onSwitchToLogin={openLoginModal}
          isLoading={isAuthLoading}
          submitError={authError}
        />

        <AuthSuccess
          isOpen={activeModal === "success"}
          onClose={closeModal}
          onLoginClick={openLoginModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
