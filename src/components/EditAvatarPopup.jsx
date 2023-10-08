import React from "react";
import { useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarValue = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar:
        avatarValue.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="newAvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          ref={avatarValue}
          required
          id="linkAvatarProfile"
          name="link-avatar"
          className="popup__field"
        ></input>
      </label>
      <span className="error" id="link-avatar-error"></span>
    </PopupWithForm>
  );
}
