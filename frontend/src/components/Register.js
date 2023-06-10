import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <main>
      <form className="register" onSubmit={handleSubmit}>
        <h3 className="register__title">Регистрация</h3>
        <input
          className="register__input register__input_login-email"
          placeholder="Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <input
          className="register__input register__input_login-pass"
          placeholder="Пароль"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
        <div className="register__text">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">
            {" "}
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
}
export default Register;
