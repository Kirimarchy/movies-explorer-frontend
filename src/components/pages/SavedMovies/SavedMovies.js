import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { filterByDuration, filterByQuery, filterUnified } from "../../../utils/utils";

const SavedMovies = ({savedMovies, onCardAction}) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [savedMoviesDisplayed, setSavedMoviesDisplayed] = useState(savedMovies);
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState(savedMovies);

  function submitSearchQuery(query){
    const moviesList = filterUnified(savedMovies, query, isFilter);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setSavedMoviesFiltered(moviesList);
      setSavedMoviesDisplayed(moviesList);
    }
    // localStorage.setItem(`${currentUser.email}|searchQuerySaved`, query);
    // localStorage.setItem(`${currentUser.email}|isFilterSaved`, isFilter);
    // localStorage.setItem(`${currentUser.email}|savedMovies`, JSON.stringify(moviesList));
  }
  
  
  function onChangeFilter() {
    setFilter(!isFilter);
    if (isFilter) {
      setSavedMoviesDisplayed(savedMoviesFiltered);
    } else {
      setSavedMoviesDisplayed(filterByDuration(savedMoviesFiltered));
    }
    setNotFound(savedMoviesDisplayed.length===0 ? true : false )
    localStorage.getItem(`${currentUser.email}|isFilterSaved`, isFilter);
  }


  // useEffect(() => {
  //   if (localStorage.getItem(`${currentUser.email}|isFilterSaved`) === 'true'){
  //     setFilter(true);
  //     setSavedMoviesDisplayed(filterByDuration(savedMovies));
  //   } else {
  //     setFilter(false);
  //     setSavedMoviesDisplayed(savedMovies);
  //   }
  // }, [savedMovies, currentUser]);


  useEffect(() => {
     setSavedMoviesFiltered(savedMovies);
  }, [savedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {onChangeFilter} 
      />
      <hr className="movies-separator"/>
        <MoviesCardList 
        movies = {savedMovies} 
        savedMovies = {savedMovies} 
        onCardAction = {onCardAction}
        />
      {isNotFound&&<p>Ничего не найдено</p>}
    </main>
  );
}

export default SavedMovies;
