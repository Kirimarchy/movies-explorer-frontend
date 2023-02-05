import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import { MainApi } from "../../../utils/api/MainApi";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";

const SavedMovies = ({movies, savedMovies, onCardAction}) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState({});
  
  const handleQuery = ( query, isShort ) => {
    setFilter({query, isShort});
  }

  return (
    <main className="saved-movies">
      <SearchForm handleSearch={handleQuery}/>
      <hr className="movies-separator"/>
    <MoviesCardList movies = {savedMovies} savedMovies = {savedMovies} onCardAction = {onCardAction} />
    </main>
  );
}

export default SavedMovies;
