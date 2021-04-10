import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUmbrellaBeach,
  faTimes,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import { MenuItems } from "./MenuItems";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">
        De Praia <FontAwesomeIcon icon={faUmbrellaBeach} />
      </h1>

      <ul className={"navbar__menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName}>
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
