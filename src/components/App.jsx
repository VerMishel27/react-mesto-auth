import Headers from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ImagePopup from "./ImagePopup.jsx";
import unionOk from "../images/Union-ok.png";
import unionNo from "../images/Union-no.png";
import { EditProfilePopup } from "./EditProfilePopup.jsx";
import { EditAvatarPopup } from "./EditAvatarPopup.jsx";
import { AddPlacePopup } from "./AddPlacePopup.jsx";
import { EditDeliteCardPopup } from "./EditDeliteCardPopup.jsx";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/Api.js";
import * as mestoAuth from "../utils/mestoAuth.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext.jsx";
import menuMobile from "../images/mobil-menu-header.png";
import closeIcon from "../images/Close-icon.svg";

function App() {
  const [editAvatarClick, setEditAvatarClick] = useState(false);
  const [editNewCardPopup, setEditNewCardPopup] = useState(false);
  const [editProfilePopup, setEditProfilePopup] = useState(false);
  const [editDelCardPopup, setEditDelCardPopup] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);

  const [delCard, setDelCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);

  //const [loggedIn, setLoggedIn] = useState(false);

  function delCardPop(card) {
    setDelCard(card);
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCurrentCards((state) => {
          return state.filter((n) => {
            return n._id !== card._id;
          });
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .addLike(card._id, !isLiked)
      .then((newCard) => {
        //console.log(newCard);
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn)
      api
        .dataProfile()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn)
      api
        .getInitialCards()
        .then((res) => {
          setCurrentCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  const handleCardClick = function (src, alt) {
    const clickCard = { src, alt };
    setSelectedCard(clickCard, true);
  };

  const isEditAvatarPopupOpen = function () {
    setEditAvatarClick(!editAvatarClick);
  };

  const isEditProfilePopupOpen = function () {
    setEditProfilePopup(!editProfilePopup);
  };

  const isAddPlacePopupOpen = function () {
    setEditNewCardPopup(!editNewCardPopup);
  };

  const handleEditDelCard = function () {
    setEditDelCardPopup(!editDelCardPopup);
  };

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditDelCardPopup(false);
    setEditNewCardPopup(false);
    setEditProfilePopup(false);
    setPopupUniconOk(false);
    setPopupUniconNo(false);
    setSelectedCard(null);
  }

  const isOpen =
    editAvatarClick ||
    editNewCardPopup ||
    editProfilePopup ||
    editDelCardPopup ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
    }
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [isOpen]);

  const handleUpdateUser = (dataProfile) => {
    api
      .editingProfile(dataProfile)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatarLink) => {
    api
      .avatarProfile(avatarLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addCard(newCard)
      .then((data) => {
        setCurrentCards([data, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  //console.log(loggedIn);

  const auth = (jwt) => {
   // console.log(jwt);
    return mestoAuth.getContent(jwt).then(({ data }) => {
      //console.log(data);
      if (data) {
        //console.log(data);
        setLoggedIn(true);
        setUserData({
          email: data.email,
        });
        navigate("/cards")
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
  
    if (jwt) {
      auth(jwt);
    }
  }, []);

  // useEffect(() => {
  //   if (loggedIn) navigate("/cards");
  // }, [loggedIn]);

  const [popupUniconNo, setPopupUniconNo] = useState(false);
  const [popupUniconOk, setPopupUniconOk] = useState(false);

  function editUniconNo() {
    setPopupUniconNo(true);
  }
  function editUniconOk() {
    setPopupUniconOk(true);
  }

  const onLogin = ({ email, password }, resetForm) => {
    setUserData({email});
    return mestoAuth
      .authorize(email, password)
      .then((res) => {
       // console.log(res);
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        if (res.token) {
         // console.log(res.token);
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          setDisplay(false)
          navigate("/cards");
        }
      })
      .then(resetForm)
      .then(() => navigate("/cards"))
      .catch((err) => {
        editUniconNo();
        console.log(err);
      });
  };

  const onRegister = ({ password, email }, resetForm) => {
    return mestoAuth
      .register(password, email)
      .then((data) => {
        //  console.log(data)
        if (data.error) {
          editUniconNo();
        } else {
          editUniconOk();
        }
      })
      .then(() => {
        resetForm;
      })
      .then(() => navigate("/sign-in"))
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  };

  const [display, setDisplay] = useState(false);

  function openInfo() {
    setDisplay(true);
  }

  function closeInfo() {
    setDisplay(false);
  }

  const Header = () => {
    return (
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Headers
              button={
                <button
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                  className="header__button"
                >
                  Регистрация
                </button>
              }
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Headers
              button={
                <button
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                  className="header__button"
                >
                  Войти
                </button>
              }
            />
          }
        />
        <Route
          path="/cards"
          element={
            <Headers
              email={<p className="header__email">{userData.email}</p>}
              button={
                <button
                  onClick={onSignOut}
                  className="header__button header__button_exit"
                >
                  Выйти
                </button>
              }
              infoMobile={
                <div
                  className={`header__menu-info ${
                    display && "header__menu-info_show appearance"
                  }`}
                >
                  <p className="header__email header__email_mobile">
                    {userData.email}
                  </p>
                  <button
                    onClick={onSignOut}
                    className="header__button header__button_exit header__button_mobile"
                  >
                    Выйти
                  </button>
                </div>
              }
              buttonOpenInfo={
                <button
                  onClick={openInfo}
                  className={`header__button-mobile ${
                    display ? "header__button-mobile_hide" : ""
                  }`}
                >
                  <img
                    className="header__button-mobile-img"
                    src={menuMobile}
                    alt="Меню"
                  />
                </button>
              }
              buttonCloseInfo={
                <button
                  className={`header__button-close ${
                    display ? "header__button-close_show" : ""
                  }`}
                  type="button"
                  onClick={closeInfo}
                >
                  <img
                    className="header__close-icon"
                    src={closeIcon}
                    alt="Закрыть"
                  />
                </button>
              }
            />
          }
        />
      </Routes>
    );
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardsContext.Provider value={currentCards}>
        <div className="page">
          <Header />
          <Routes>
            <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={onRegister} />}
            />
            <Route
              path="/cards"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  onSignOut={onSignOut}
                  isOnCardClick={handleCardClick}
                  avatarProfile={isEditAvatarPopupOpen}
                  dataProfile={isEditProfilePopupOpen}
                  newCardPopup={isAddPlacePopupOpen}
                  delCardPopup={handleEditDelCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isDelCard={delCardPop}
                  component={Main}
                />
              }
            />
            <Route
              path="/"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
        </div>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {/* <InfoTip /> */}
        <InfoTooltip
          isOpen={popupUniconNo}
          onClose={closeAllPopups}
          title={"Что-то пошло не так! Попробуйте ещё раз."}
          img={unionNo}
        />
        <InfoTooltip
          isOpen={popupUniconOk}
          onClose={closeAllPopups}
          title={"Вы успешно зарегистрировались!"}
          img={unionOk}
        />
        <EditProfilePopup
          isOpen={editProfilePopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={editAvatarClick}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={editNewCardPopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditDeliteCardPopup
          isOpen={editDelCardPopup}
          onClose={closeAllPopups}
          card={delCard}
          onCardDelete={handleCardDelete}
        />
      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
