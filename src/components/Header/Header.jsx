import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logoText from "../../assets/icons/header/logo-newsexplorer.svg";
import logoCircle from "../../assets/icons/header/logo-circle-n.svg";
import "./Header.css";

function Header({ isHome = false, isLoggedIn, onLoginClick, onLogout }) {
  return (
    <header className={`header ${isHome ? "header_theme_home" : ""}`}>
      <Link className="header__logo" to="/">
        <img className="header__logo-text" src={logoText} alt="NewsExplorer" />
        <img className="header__logo-circle" src={logoCircle} alt="N" />
      </Link>
      <Navigation
        isHome={isHome}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;
