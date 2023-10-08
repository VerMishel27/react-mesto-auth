import React from "react";
import UnionOk from '../images/Union-ok.png';
import UnionNo from '../images/Union-no.png';
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import closeIcon from "../images/Close-icon.svg";

export default function InfoTooltip({isOpen, onClose, title, img}) {
    return (
        <div className={`popup ${isOpen ? "popup_opened appearance" : ""}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={onClose}>
            <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
          </button>
            <img className="popup__img_infoTooltip" src={img}/>
           <h2 className="popup__title popup__title_infoTooltip">{title}</h2>    
        </div>
      </div>
    )
}