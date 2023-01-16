import React from "react";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList/>
    </main>
  );
}

export default SavedMovies;
