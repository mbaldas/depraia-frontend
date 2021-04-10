import React from "react";

import NavBar from "../components/NavBar/NavBar";
import "./index.scss";

const MainPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <section className="mainpage__section"></section>
    </>
  );
};

export default MainPage;
