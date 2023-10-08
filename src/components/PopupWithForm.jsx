import React from "react";
import closeIcon from "../images/Close-icon.svg";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  titleSaveButton,
  children,
  onSubmit
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened appearance" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
        <form
          className={`popup__form popup__form_type_${name}`}
          method="post"
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__submit-button" type="submit">
            {titleSaveButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
