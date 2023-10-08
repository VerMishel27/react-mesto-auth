import React from "react";
import PopupWithForm from "./PopupWithForm";

export function EditDeliteCardPopup({ isOpen, onClose, card, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delCard"
      title="Вы уверены?"
      titleSaveButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
