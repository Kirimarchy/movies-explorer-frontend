import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import { MainApi } from "../../../utils/api/MainApi";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";

const SavedMovies = () => {
  const {currentUser} = useContext(CurrentUserContext);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isFilter, setFilter] = useState({});
  
  const handleQuery = ( query, isShort ) => {
    setFilter({query, isShort});
  }

  useEffect(()=>{
    MainApi.getUserMovies()
    .then(movies => {
      setSavedMoviesList(movies.filter(movie => movie.owner._id === currentUser._id));
    })
    .catch(err => console.log('Error', err));
  },[]);

  return (
    <main className="saved-movies">
      <SearchForm handleSearch={handleQuery}/>
      <hr className="movies-separator"/>
      <MoviesCardList movies = {savedMoviesList} savedMovies = {savedMoviesList} filter = {isFilter}/>
    </main>
  );
}

export default SavedMovies;
