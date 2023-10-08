import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const currentCard = useContext(CurrentCardsContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          alt="Аватарка"
          src={currentUser.avatar}
          className="profile__avatar"
        />
        <button
          className="profile__avatar-changing"
          onClick={props.avatarProfile}
        ></button>
        <div className="profile__info">
          <div className="profile__block-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.dataProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.newCardPopup}
        ></button>
      </section>
      <section className="elements">
        {currentCard.map((cardData) => (
          <Card
            key={cardData._id}
            title={cardData.name}
            src={cardData.link}
            alt={cardData.name}
            like={cardData.likes}
            ownerId={cardData.owner._id}
            onCardClick={props.isOnCardClick}
            delCardPopup={props.delCardPopup}
            onCardLike={props.onCardLike}
            card={cardData}
            isDelCard={props.isDelCard}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
