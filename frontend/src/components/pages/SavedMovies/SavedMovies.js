import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList/>
    </main>
  );
}

export default SavedMovies;
