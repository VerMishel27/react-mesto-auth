

export default function Form({title, buttonSubmitTitle, children, registrStyle, onSubmit}) {


  return (
    <form onSubmit={onSubmit} className="form">
      <h2 className="form__title">{title}</h2>
      {children}
      <button className="form__submit-button" type="submit">
        {buttonSubmitTitle}
      </button>
      {registrStyle}
    </form>
  );
}
