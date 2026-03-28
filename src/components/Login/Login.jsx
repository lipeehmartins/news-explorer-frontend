import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Login({ isOpen, onClose, onSubmit, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    onSubmit({ email });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Entrar"
      footer={(
        <p className="popup__footer-text">
          ou{' '}
          <button className="popup__footer-link" type="button" onClick={onSwitchToRegister}>
            Cadastre-se
          </button>
        </p>
      )}
    >
      <form className="popup__form" onSubmit={handleSubmit}>
        <label className="popup__label" htmlFor="login-email">
          E-mail
        </label>
        <input
          id="login-email"
          className="popup__input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Digite seu e-mail"
          required
        />

        <label className="popup__label" htmlFor="login-password">
          Senha
        </label>
        <input
          id="login-password"
          className="popup__input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Digite sua senha"
          required
        />

        <button className="popup__submit" type="submit">
          Entrar
        </button>
      </form>
    </PopupWithForm>
  );
}

export default Login;