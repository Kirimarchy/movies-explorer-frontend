import React from "react";
import "./Promo.css";
import Navtab from "../Navtab/Navtab";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about-project">
          <h1 className="promo__title">
            Дипломный проект студента факультета Веб&#8209;разработки
          </h1>
        </div>
        <Navtab/>
      </div>
    </section>
  );
}

export default Promo;
