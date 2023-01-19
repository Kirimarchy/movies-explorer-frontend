import React from "react";
import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <hr className="movies__separator"/>
      <MoviesCardList/>
      <Footer/>
    </main>
  );
}

export default SavedMovies;
