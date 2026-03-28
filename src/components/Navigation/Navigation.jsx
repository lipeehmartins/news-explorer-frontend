import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoutIcon from "../../assets/icons/header/icon-logout.svg";
import hamburgerIcon from "../../assets/icons/header/hamburguer-menu.svg";
import closeIcon from "../../assets/icons/header/close-X.svg";
import logoWhite from "../../assets/icons/header/logo-newsexplorer-white.svg";
import "./Navigation.css";

function Navigation({ isLoggedIn, currentUserName, onLoginClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`navigation ${isMenuOpen ? "navigation_open" : ""}`}
      aria-label="Menu principal"
    >
      <button
        className="navigation__toggle"
        type="button"
        onClick={handleToggleMenu}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        <img
          className="navigation__toggle-icon"
          src={isMenuOpen ? closeIcon : hamburgerIcon}
          alt=""
          aria-hidden="true"
        />
      </button>

      <div className="navigation__desktop">
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${isActive ? "navigation__link_state_active" : ""}`
          }
          to="/"
        >
          Início
        </NavLink>

        {isLoggedIn && (
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_state_active" : ""}`
            }
            to="/saved-news"
          >
            Artigos salvos
          </NavLink>
        )}

        {isLoggedIn ? (
          <button
            className="navigation__button"
            type="button"
            onClick={() => {
              handleCloseMenu();
              onLogout();
            }}
          >
            <span>Sair ({currentUserName})</span>
            <img
              className="navigation__logout-icon"
              src={logoutIcon}
              alt="Ícone de sair"
            />
          </button>
        ) : (
          <button
            className="navigation__button"
            type="button"
            onClick={() => {
              handleCloseMenu();
              onLoginClick();
            }}
          >
            Entrar
          </button>
        )}
      </div>

      <div className="navigation__mobile-panel">
        <div className="navigation__mobile-header">
          <Link
            className="navigation__mobile-logo"
            to="/"
            onClick={handleCloseMenu}
          >
            <img
              className="navigation__mobile-logo-image"
              src={logoWhite}
              alt="NewsExplorer"
            />
          </Link>
          <button
            className="navigation__mobile-close"
            type="button"
            onClick={handleCloseMenu}
            aria-label="Fechar menu"
          >
            <img
              className="navigation__mobile-close-icon"
              src={closeIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <NavLink
          className={({ isActive }) =>
            `navigation__link ${isActive ? "navigation__link_state_active" : ""}`
          }
          to="/"
          onClick={handleCloseMenu}
        >
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_state_active" : ""}`
            }
            to="/saved-news"
            onClick={handleCloseMenu}
          >
            Artigos salvos
          </NavLink>
        )}

        {isLoggedIn ? (
          <button
            className="navigation__button"
            type="button"
            onClick={onLogout}
          >
            <span>Sair ({currentUserName})</span>
            <img
              className="navigation__logout-icon"
              src={logoutIcon}
              alt="Ícone de sair"
            />
          </button>
        ) : (
          <button
            className="navigation__button"
            type="button"
            onClick={onLoginClick}
          >
            Entrar
          </button>
        )}
      </div>

      {isMenuOpen && (
        <button
          className="navigation__overlay"
          type="button"
          aria-label="Fechar menu"
          onClick={handleCloseMenu}
        />
      )}
    </nav>
  );
}

export default Navigation;
