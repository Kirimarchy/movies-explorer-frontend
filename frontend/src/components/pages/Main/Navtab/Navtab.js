import React from "react";
import { HashLink } from "react-router-hash-link";
import "./Navtab.css";

const Navtab = () => {
  return (
      <nav className="navtab">
        <HashLink smooth to="/about#project" className="navtab__link">О проекте</HashLink>
        <HashLink smooth to="/about#techs" className="navtab__link">Технологии</HashLink>
        <HashLink smooth to="/about#student" className="navtab__link">Студент</HashLink>
      </nav>
  )
}

export default Navtab;
