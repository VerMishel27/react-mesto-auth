import './index.css';

import Api from '../components/Api.js';
import { configApi } from '../utils/constants.js';
import { config } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { elements } from '../utils/constants.js';
import { profilePopup } from '../utils/constants.js';
import { profileName } from '../utils/constants.js';
import { profileDescription } from '../utils/constants.js';
import { popupNewCard } from '../utils/constants.js';
import { imagePopup } from '../utils/constants.js';
import { popupDelCard } from '../utils/constants.js';
import { avatarPopupNew } from '../utils/constants.js';
import PopupWithFormDelCard from '../components/PopupWithFormDelCard';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
 import { saveLoading } from '../utils/saveLoading.js';

const buttonOpenEdit = document.querySelector('.profile__edit-button');

const profile = document.querySelector('.profile');
const profileAvatar = document.querySelector('.profile__avatar');
const buttonAvatar = document.querySelector('.profile__avatar-changing');
const formAvatar = document.querySelector('#formNewAvatar')

const buttonOpenAdd = profile.querySelector('.profile__add-button');

const formEditProfile = document.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = formEditProfile.querySelector('#fieldName'); // Находим поля формы в DOM
const jobInput = formEditProfile.querySelector('#fieldJob');

const formNewCard = document.querySelector('#formNewCard'); // Находим форму создания карточки в DOM
export const buttonSaveNewCard = formNewCard.querySelector('#submit-button_newCard'); 
const buttonSaveNewAvatar = document.querySelector('#submit-button_newAvatar');
export const buttonDelCard = document.querySelector('#submit-button_delCard');

// Запрос на сервер

const api = new Api(configApi);

// Открытие закрытие попап

const changeStatePopupImage = new PopupWithImage(imagePopup);


// Валидация формы

const validatorEditProfile = new FormValidator(config, formEditProfile);
validatorEditProfile.enableValidation();
const validatorAddCard = new FormValidator(config, formNewCard);
validatorAddCard.enableValidation();
const validatorAddAvatar = new FormValidator(config, formAvatar);
validatorAddAvatar.enableValidation();

// Профиль пользователя

const userInfo = new UserInfo(profileName, profileDescription);

// Проверка Sumbit

function callbackSumbitFormNewCard (formData, button) {
  const name = formData['name-card'];
  const link = formData['link-card'];
  const newPost = {name, link};

  api.addCard(newPost)
  .then(data => {
    cardsList.addItem(creatingCard(data, data.owner), 'prepend');
    popupNewCardForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      saveLoading(false, button)
    });
}

const popupNewCardForm = new PopupWithForm(popupNewCard, callbackSumbitFormNewCard, saveLoading);
popupNewCardForm.setEventListeners();

function callbackSumbitFormprofile (formData, button) {
    const name = formData.name;
    const about = formData.job;
    const dataProfile = {name, about};

    userInfo.setUserInfo(name, about);
    api.editingProfile(dataProfile)
      .then(() => popupProfileNew.close())
      .catch((err) => console.log(err))
      .finally(() => {
        saveLoading(false, button)
      });
}

const popupProfileNew = new PopupWithForm(profilePopup, callbackSumbitFormprofile, saveLoading);
popupProfileNew.setEventListeners();

function callbackNewAvatar(data, button) {
  const avatar = data['link-avatar'];
  const avatarka = {avatar};

  api.avatarProfile(avatarka)
    .then(profileAvatar.src = avatarka.avatar)
    .then(() => avatarProfile.close())
    .catch((err) => console.log(err))
    .finally(() => {
      saveLoading(false, button)
    })
}

const avatarProfile = new PopupWithForm(avatarPopupNew, callbackNewAvatar, saveLoading);
avatarProfile.setEventListeners();

function checkingForm(nameInput) {
  const event = new Event('input');
  nameInput.dispatchEvent(event);
}

// Создание карточки

function creatingCard (dataCard, userInfo) {
  const todoElement = new Card(dataCard, handleClickEdit, handleClickDelete, handleClickLike, userInfo, '.template').createCard();
  return todoElement;
}

// Постановка-снятие лайка

function handleClickLike (todoLike) {
  if (todoLike.isLiked()) {
    api.delLike(todoLike.getId())
    .then(data => {
      todoLike.setClickLike(data)
    })
    .catch((err) => console.log(err))  
  } else {
    api.addLike(todoLike.getId())
    .then(data => {
      todoLike.setClickLike(data)
    })
    .catch((err) => console.log(err))
  }
}

// Удаление карточки

const popupWithFormDelCard = new PopupWithFormDelCard(popupDelCard, null, saveLoading);
popupWithFormDelCard.setEventListeners()

function handleClickDelete(todoElement) {
  popupWithFormDelCard.open()
  popupWithFormDelCard.setActionSumbit(() => {
    api.removeCard(todoElement.getId())
          .then(() => todoElement.remove())
          .then(() => popupWithFormDelCard.close())
          .catch((err) => console.log(err))
          .finally(() => {
            saveLoading(false, popupWithFormDelCard.getButtonSaveCard())
      })
  })
} 

// Открытие попап с картинкой

const handleClickEdit = (dataTodo) => {
  changeStatePopupImage.open(dataTodo);
}

const cardsList = new Section ({
  renderer: (initialItem, userData) => {
    cardsList.addItem(creatingCard(initialItem, userData))
  },
},
elements
);

// Слушатели открытия попап

function openProfile() {
  popupProfileNew.open();
  const dataProfile = userInfo.getUserInfo();
  nameInput.value = dataProfile.userName;
  jobInput.value = dataProfile.userJob;
  checkingForm(nameInput);
}

function openPopapNewCard () {
  popupNewCardForm.open()
  validatorAddCard.disabledButton(buttonSaveNewCard);
}

Promise.all([api.dataProfile(), api.getInitialCards()])
  .then(([dataProfile, dataCards]) => {
    userInfo.setUserInfo(dataProfile.name, dataProfile.about);
    profileAvatar.src = dataProfile.avatar;
    cardsList.renderItems(dataCards, dataProfile)
  })
  .catch((err) => console.log(err))

buttonAvatar.addEventListener('mouseover', () => {buttonAvatar.style.cssText = 'opacity: 1'})
buttonAvatar.addEventListener('mouseout', () => {buttonAvatar.style.cssText = 'opacity: 0'})
buttonAvatar.addEventListener('click', ()=> {
    avatarProfile.open();
    validatorAddAvatar.disabledButton(buttonSaveNewAvatar)
  })

  buttonOpenAdd.addEventListener('click', openPopapNewCard);
  buttonOpenEdit.addEventListener('click', openProfile);