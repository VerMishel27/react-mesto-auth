import React from "react";
import logoHeader from "../images/logo-header.svg";

function Header({
  button,
  email,
  infoMobile,
  buttonOpenInfo,
  buttonCloseInfo,
}) {
  return (
    <header className="header">
      {infoMobile}
      <div className="header__menu">
        <img src={logoHeader} alt="Логотип сайта" className="header__logo" />
        <div className="header__right">
          {email}
          {button}
          {buttonOpenInfo}
          {buttonCloseInfo}
        </div>
      </div>
    </header>
  );
}

export default Header;
