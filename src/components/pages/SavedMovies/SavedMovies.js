import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { filterByDuration, filterByQuery } from "../../../utils/utils";

const SavedMovies = ({savedMovies, onCardAction}) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState({});
  const [isNotFound, setNotFound] = useState(false);
  const [savedMoviesDisplayed, setSavedMoviesDisplayed] = useState(savedMovies);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState(savedMoviesDisplayed);

  function submitSearchQuery(query){
    const moviesList = filterByQuery(savedMovies, query);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      isFilter?setSavedMoviesFiltered(filterByDuration(moviesList)):setSavedMoviesFiltered(moviesList);
    }
    localStorage.setItem(`${currentUser.email}|searchQuerySaved`, query);
    localStorage.setItem(`${currentUser.email}|isFilterSaved`, isFilter);
    localStorage.setItem(`${currentUser.email}|savedMovies`, JSON.stringify(moviesList));
  }
  
  // function filterSavedMoviesList(movies, query, filter) {
  //   const moviesList = filterByQuery(movies, query);  
  //   setSavedMoviesFiltered(filter? filterByDuration(moviesList) : moviesList);
  //   localStorage.setItem(
  //     `${currentUser.email}|savedMovies`,
  //     JSON.stringify(moviesList)
  //   );
  // }
  
  function onChangeFilter() {
    setFilter(!isFilter);
    if (isFilter) {
      setSavedMoviesFiltered(filterByDuration(savedMoviesDisplayed));
    } else {
      setSavedMoviesFiltered(savedMoviesDisplayed);
    }
    localStorage.setItem(`${currentUser.email}|isFilterSaved`, !isFilter);
  }


  useEffect(() => {
    localStorage.getItem(`${currentUser.email}|isFilterSaved`) === 'true' ?
      setFilter(true) : setFilter(false);
  }, [currentUser]);


  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email}|savedMovies`)) {
      const movies = JSON.parse(localStorage.getItem(`${currentUser.email}|savedMovies`));
      setSavedMoviesDisplayed(movies);
      localStorage.getItem(`${currentUser.email}|isFilter`) === 'true' ?
        setSavedMoviesFiltered(filterByDuration(movies)) : setSavedMoviesFiltered(movies);
    }
  }, [currentUser]);

  return (
    <main className="saved-movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {onChangeFilter} 
      />
      <hr className="movies-separator"/>
        <MoviesCardList 
        movies = {savedMoviesFiltered} 
        savedMovies = {savedMovies} 
        onCardAction = {onCardAction}
        />
      {isNotFound&&<p>Ничего не найдено</p>}
    </main>
  );
}

export default SavedMovies;
