import React from "react";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./style.scss";

const Header = ({ isLoggedIn, setIsLoggedIn, setUserName, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <header>
      {isLoggedIn ? (
        <div className="header_wrap">
          <div className="header_wrap-1">
            Добро пожаловать,&nbsp;<strong>{userName}</strong>
          </div>
          <nav className="header_wrap-2">
            <NavLink
              to="/login"
              onClick={handleLogOut}
              className="header_wrap-2-navlink"
            >
              <ExitToAppIcon/>
            </NavLink>
          </nav>
        </div>
      ) : (
        <div className="welcome-unknown">Добро пожаловать, незнакомец!</div>
      )}
    </header>
  );
};

export default Header;
