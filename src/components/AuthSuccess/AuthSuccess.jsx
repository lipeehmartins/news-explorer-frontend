import { useEffect } from "react";
import closeIcon from "../../assets/icons/popup/icon-close.svg";
import "../PopupWithForm/PopupWithForm.css";

function AuthSuccess({ isOpen, onClose, onLoginClick }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscClose);

    return () => {
      window.removeEventListener("keydown", onEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const onOverlayClick = (event) => {
    if (event.target.classList.contains("popup")) {
      onClose();
    }
  };

  return (
    <div className="popup" onMouseDown={onOverlayClick} role="presentation">
      <div
        className="popup__container popup__container_type_success"
        role="dialog"
        aria-modal="true"
        aria-label="Cadastro concluído"
      >
        <button
          className="popup__close"
          type="button"
          aria-label="Fechar modal"
          onClick={onClose}
        >
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt=""
            aria-hidden="true"
          />
        </button>

        <h2 className="popup__success-title">
          Cadastro concluído com sucesso!
        </h2>

        <button
          className="popup__success-link"
          type="button"
          onClick={onLoginClick}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default AuthSuccess;
