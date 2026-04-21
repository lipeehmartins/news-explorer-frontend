import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const INITIAL_LOGIN_VALUES = {
  email: "",
  password: "",
};

function Login({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToRegister,
  isLoading,
  submitError,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation(INITIAL_LOGIN_VALUES);

  useEffect(() => {
    if (isOpen) {
      resetForm(INITIAL_LOGIN_VALUES, {}, false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid || isLoading) {
      return;
    }

    onSubmit({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Entrar"
      footer={
        <p className="popup__footer-text">
          ou{" "}
          <button
            className="popup__footer-link"
            type="button"
            onClick={onSwitchToRegister}
          >
            Inscreva-se
          </button>
        </p>
      }
    >
      <form className="popup__form" onSubmit={handleSubmit}>
        <label className="popup__label" htmlFor="login-email">
          E-mail
        </label>
        <input
          name="email"
          id="login-email"
          className="popup__input"
          type="email"
          autoComplete="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Insira e-mail"
          required
        />
        {errors.email && (
          <span className="popup__input-error">{errors.email}</span>
        )}

        <label className="popup__label" htmlFor="login-password">
          Senha
        </label>
        <input
          name="password"
          id="login-password"
          className="popup__input"
          type="password"
          autoComplete="current-password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Insira a senha"
          minLength={6}
          required
        />
        {errors.password && (
          <span className="popup__input-error">{errors.password}</span>
        )}

        {submitError && <p className="popup__submit-error">{submitError}</p>}

        <button
          className="popup__submit"
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </PopupWithForm>
  );
}

export default Login;
