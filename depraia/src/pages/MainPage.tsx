import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import NavBar from "../components/NavBar/NavBar";
import beach from "../assets/wp6191831.jpg";

import "./index.scss";

const MainPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <section className="mainpage__section">
        <div className="mainpage__section--schedule">
          <div className="mainpage__section--schedule-items">
            <InputLabel className="mainpage__section--schedule-label">
              Praia
            </InputLabel>
            <Input />
          </div>
          <div className="mainpage__section--schedule-items">
            <InputLabel className="mainpage__section--schedule-label">
              Nome
            </InputLabel>
            <Input />
          </div>
          <div className="mainpage__section--schedule-items">
            <InputLabel className="mainpage__section--schedule-label">
              Quando
            </InputLabel>
            <Input />
          </div>
          <button className="mainpage__section--schedule-items btn">
            <span>Confirmar</span>
          </button>
        </div>
        <img src={beach} className="mainpage__section--image"></img>
      </section>
    </>
  );
};

export default MainPage;
