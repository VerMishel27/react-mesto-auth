import React from "react";
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [description, setDescription] = useState(currentUser.about);
  const [name, setName] = useState(currentUser.name);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="dataProfile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          className="popup__field"
          value={name || ''}
          onChange={handleChangeName}
          required
          minLength="2"
          maxLength="40"
        />
      </label>
      <span id="name-error" className="error"></span>
      <label className="popup__label">
        <input
          type="text"
          className="popup__field"
          name="job"
          value={description || ''}
          onChange={handleChangeDescription}
          required
          minLength="2"
          maxLength="200"
        />
      </label>
      <span id="job-error" className="error"></span>
    </PopupWithForm>
  );
}
