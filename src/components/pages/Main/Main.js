import React from "react";
import './Main.css';
import Promo from './Promo/Promo.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import "./Main.css";
import Footer from "../../Footer/Footer";


const Main = () => {

    return (
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer/>
      </main>
    );
}

export default Main;
