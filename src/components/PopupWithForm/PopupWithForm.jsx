import { useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({ isOpen, title, onClose, children, footer }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscClose);

    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const onOverlayClick = (event) => {
    if (event.target.classList.contains('popup')) {
      onClose();
    }
  };

  return (
    <div className="popup" onMouseDown={onOverlayClick} role="presentation">
      <div className="popup__container" role="dialog" aria-modal="true" aria-label={title}>
        <button className="popup__close" type="button" aria-label="Fechar modal" onClick={onClose}>
          ✕
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
        {footer}
      </div>
    </div>
  );
}

export default PopupWithForm;