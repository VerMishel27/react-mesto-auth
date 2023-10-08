import React from "react";
import logoHeader from "../images/logo-header.svg";

function Header({ button, email }) {
 
  return (
    <header className="header">
      <img src={logoHeader} alt="Логотип сайта" className="header__logo" />
      <div className="header__right">
        {/* {null || email} */}
        {email}
        {button}
        </div>
    </header>
  );
}

export default Header;
