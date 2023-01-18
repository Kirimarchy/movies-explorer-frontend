import React from "react";
import "./Movies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm/>
      <hr className="movies__separator"/>
      <MoviesCardList/>
    </main>
  );
}

export default Movies;
