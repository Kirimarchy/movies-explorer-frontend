import React from "react";
import "./Movies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm/>
      <hr className="movies__separator"/>
      <MoviesCardList/>
      <Footer/>
    </main>
  );
}

export default Movies;
