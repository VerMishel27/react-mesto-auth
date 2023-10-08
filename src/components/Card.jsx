import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({
  delCardPopup,
  onCardClick,
  src,
  title,
  like,
  alt,
  ownerId,
  onCardLike,
  card,
  isDelCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    delCardPopup();
    isDelCard(card);
  };

  const handleClick = () => {
    onCardClick(src, alt);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = ownerId === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = like.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <article className="element">
      <button
        type="button"
        className="element__img-button"
        onClick={handleClick}
      >
        <img className="element__mask-group" src={src} alt={alt} />
      </button>
      {isOwn && (
        <button
          type="button"
          className="element__del-card"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__description">
        <h3 className="element__title">{title}</h3>
        <div className="element__group-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__number-like">{like.length}</span>
        </div>
      </div>
    </article>
  );
}
