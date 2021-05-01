import "./index.scss";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import MenuMinhasReservas from "./MenuMinhasReservas";



export default function Historico() {
 

  return (
    <>
      <NavBar />
      <div className="container--reservas">
        <MenuMinhasReservas />
          <div className="right--reservas">
            <div className="container--right__reservas">
              <h1 className="font--black">Histórico</h1>
            </div>
          </div>
      </div>
    </>
  );
}

