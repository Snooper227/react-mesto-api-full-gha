import React from "react";
import Logo from "../images/vector.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={Logo} className="header__logo" alt="Лого" />
      {loggedIn && (
        <nav className="header__user">
          <span>{email}</span>
          <button
            className="header__link header__link_logged-in"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </nav>
      )}
      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
