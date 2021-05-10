import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./index.scss";
import { MenuItems } from "./MenuItems";
import { useLocalStorage } from "../../hooks/localStorage";

const NavBar: React.FC = () => {
  const history = useHistory();
  const [actualUser, setActualUser] = useLocalStorage("name", "");
  const logoutFunc = () => {
    window.localStorage.clear();
    history.push("/signin");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__logo">
        De Praia <FontAwesomeIcon icon={faUmbrellaBeach} />
      </h1>

      <ul className={"navbar__menu"}>
        {MenuItems.map((item, index) => {
          if (actualUser.admin === false && item.title === "Admin") 
            return <> </>;
          if (actualUser.tipoUsuario !== 3 && item.title === "Meus Produtos")
            return <> </>;
  
          return (
            <li key={index}>
              <Link
                to={item.url}
                className={item.cName}
                onClick={() => {
                  if (item.title === "Logout") {
                    logoutFunc();
                  }
                }}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
