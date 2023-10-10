import Form from "./Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");

  const navigate = useNavigate("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    // setMessage("");
  };

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({ password, email }, resetForm)
      // .then(() => {
      //   resetForm;
      // })
      // .then(() => navigate("/sign-in"))
      // .catch((err) => {
      //   setMessage(err.message || "Что-то пошло не так");
      // });
  }

  const visibility = (
    <button
      onClick={() => {
        navigate("/sign-in");
      }}
      type="button"
      className="form__registrationButton"
    >
      Уже зарегистрированы? Войти
    </button>
  );
  return (
      <Form
        onSubmit={handleSubmit}
        title="Регистрация"
        buttonSubmitTitle="Зарегистрироваться"
        registrStyle={visibility}
      >
        <label className="form__label">
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form__label">
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="40"
          />
        </label>
      </Form>
  );
}
