import React from "react";
import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about-project">
          <h1 className="promo__title">
            Дипломный проект студента факультета Веб&#8209;разработки
          </h1>
        </div>
          <div className="promo__navigation">
            <a href="/#project" className="promo__nav-link">
              О проекте
            </a>
            <a href="/#techs" className="promo__nav-link">
              Технологии
            </a>
            <a href="/#student" className="promo__nav-link">
              Студент
            </a>
          </div>
      </div>
    </section>
  );
}

export default Promo;
