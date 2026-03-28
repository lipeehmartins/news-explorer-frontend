import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function Register({ isOpen, onClose, onSubmit, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    onSubmit({ email, name });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastre-se"
      footer={
        <p className="popup__footer-text">
          ou{" "}
          <button
            className="popup__footer-link"
            type="button"
            onClick={onSwitchToLogin}
          >
            Entrar
          </button>
        </p>
      }
    >
      <form className="popup__form" onSubmit={handleSubmit}>
        <label className="popup__label" htmlFor="register-email">
          E-mail
        </label>
        <input
          id="register-email"
          className="popup__input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Digite seu e-mail"
          required
        />

        <label className="popup__label" htmlFor="register-password">
          Senha
        </label>
        <input
          id="register-password"
          className="popup__input"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Crie uma senha"
          required
        />

        <label className="popup__label" htmlFor="register-name">
          Nome
        </label>
        <input
          id="register-name"
          className="popup__input"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Digite seu nome"
          minLength={2}
          maxLength={30}
          required
        />

        <button className="popup__submit" type="submit">
          Cadastre-se
        </button>
      </form>
    </PopupWithForm>
  );
}

export default Register;
