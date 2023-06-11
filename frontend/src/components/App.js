import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import { api } from "../utils/Api";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmCardDeletePopup from "./ConfirmCardDeletePopup";
import Login from "./Login";
import Register from "./Register";
import auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isConfirmCardDeletePopupOpen, setConfirmCardDeletePopupOpen] =
    React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [tooltipData, setTooltipData] = React.useState({
    status: false,
    title: "",
  });
  const navigate = useNavigate();

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
      auth
        .chekTokenValid(token)
        .then((response) => {
          if (response) {
            setUserEmail(response.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function openConfirmCardDeletePopup(card) {
    setConfirmCardDeletePopupOpen(true);
    setDeletedCard(card._id);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setConfirmCardDeletePopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data.name, data.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmite(data) {
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(deletedCard) {
    api
      .deleteCard(deletedCard)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setTooltipData({
          status: true,
          title: "Вы успешно зарегистрировались!",
        });
        navigate("./signin");
      })
      .catch(() => {
        setTooltipData({
          status: false,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorization(email, password)
      .then((token) => {
        if (token) {
          localStorage.setItem("jwt", token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("./signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={userEmail} onSignOut={handleLogOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onNewPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onConfirmCardDelete={openConfirmCardDeletePopup}
            />
          }
        />

        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
      </Routes>
      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmite}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        status={tooltipData.status}
        title={tooltipData.title}
      />

      <ConfirmCardDeletePopup
        onClose={closeAllPopups}
        isOpen={isConfirmCardDeletePopupOpen}
        cardId={deletedCard}
        onCardDelete={handleCardDelete}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
