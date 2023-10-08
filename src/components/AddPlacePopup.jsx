import React from "react";
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const currentCard = useContext(CurrentCardsContext);

  useEffect(() => {
    setCardLink("");
    setCardName("");
}, [isOpen]);

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="newCard"
      title="Новое место"
      titleSaveButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          name="nameCard"
          className="popup__field"
          value={cardName}
          onChange={handleChangeCardName}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
      </label>
      <span id="name-error" className="error"></span>
      <label className="popup__label">
        <input
          type="url"
          className="popup__field"
          name="link-card"
          value={cardLink}
          onChange={handleChangeCardLink}
          placeholder="Ссылка на картинку"
          required
        />
      </label>
      <span id="job-error" className="error"></span>
    </PopupWithForm>
  );
}
