import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <main>
      <form className="login" method="get" onSubmit={handleSubmit}>
        <h3 className="login__title">Вход</h3>
        <input
          className="login__input login__input_login-email"
          placeholder="Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <input
          className="login__input login__input_login-pass"
          placeholder="Пароль"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </main>
  );
}
export default Login;
