import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormWithValidation from "../../hooks/useFormWithValidation";

const INITIAL_REGISTER_VALUES = {
  email: "",
  password: "",
  name: "",
};

function Register({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
  isLoading,
  submitError,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation(INITIAL_REGISTER_VALUES);

  useEffect(() => {
    if (isOpen) {
      resetForm(INITIAL_REGISTER_VALUES, {}, false);
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
      name: values.name,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Inscrever-se"
      footer={
        <p className="popup__footer-text">
          ou{" "}
          <button
            className="popup__footer-link"
            type="button"
            onClick={onSwitchToLogin}
          >
            Entre
          </button>
        </p>
      }
    >
      <form className="popup__form" onSubmit={handleSubmit}>
        <label className="popup__label" htmlFor="register-email">
          E-mail
        </label>
        <input
          name="email"
          id="register-email"
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

        <label className="popup__label" htmlFor="register-password">
          Senha
        </label>
        <input
          name="password"
          id="register-password"
          className="popup__input"
          type="password"
          autoComplete="new-password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Insira a senha"
          minLength={6}
          required
        />
        {errors.password && (
          <span className="popup__input-error">{errors.password}</span>
        )}

        <label className="popup__label" htmlFor="register-name">
          Nome de usuário
        </label>
        <input
          name="name"
          id="register-name"
          className="popup__input"
          type="text"
          autoComplete="name"
          value={values.name || ""}
          onChange={handleChange}
          placeholder="Insira seu nome de usuário"
          minLength={2}
          maxLength={30}
          required
        />
        {errors.name && (
          <span className="popup__input-error">{errors.name}</span>
        )}

        {submitError && <p className="popup__submit-error">{submitError}</p>}

        <button
          className="popup__submit"
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Enviando..." : "Inscrever-se"}
        </button>
      </form>
    </PopupWithForm>
  );
}

export default Register;
