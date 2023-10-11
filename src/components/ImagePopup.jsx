import closeIcon from "../images/Close-icon.svg";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image  ${card ? "popup_opened popup_overlay-img appearance" : ""}`}>
      <div className="popup__container popup__container_image">
        <button
          className="popup__close"
          id="imagePopupClose"
          type="button"
          onClick={onClose}
        >
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
        <img className="popup__img" src={card?.src} alt={card?.alt} />
        <h3 className="popup__subtitle">{card?.alt}</h3>
      </div>
    </div>
  );
}
