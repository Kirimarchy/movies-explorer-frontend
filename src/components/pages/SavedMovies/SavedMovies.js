import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { filterByDuration, filterByQuery, filterUnified } from "../../../utils/utils";

const SavedMovies = () => {
  const {currentUser, userMovies, setUserMovies} = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [userMoviesDisplayed, setSavedMoviesDisplayed] = useState(userMovies);
  const [userMoviesFiltered, setSavedMoviesFiltered] = useState(userMovies);


  function getSavedMovies(){
    if(!userMovies){
      setLoading(true);
    MainApi.getUserMovies()
    .then(movies => {
      setUserMovies(movies.filter(movie => movie.owner._id === currentUser._id));
    })
    .catch(err =>
      setPopUp({
        isOpen: true,
        successful: false,
        text: err,
      })
      )
    .finally(() => setLoading(false));}
  }


  function submitSearchQuery(query){
    const moviesList = filterUnified(userMovies, query, isFilter);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setSavedMoviesFiltered(moviesList);
      setSavedMoviesDisplayed(moviesList);
    }
  }
  
  
  function onChangeFilter() {
    setFilter(!isFilter);
    if (isFilter) {
      setSavedMoviesDisplayed(filterByDuration(userMovies));
    } else {
      setSavedMoviesDisplayed(userMovies);
    }
    setNotFound(userMoviesDisplayed.length===0 ? true : false )
    localStorage.getItem(`${currentUser.email}|isFilterSaved`, isFilter);
  }

  useEffect(() => {
     setSavedMoviesFiltered(userMovies);
  }, [userMovies]);

  return (
    <main className="saved-movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {onChangeFilter} 
      />
      <hr className="movies-separator"/>
        <MoviesCardList movies = {userMovies}/>
      {isNotFound&&<p>Ничего не найдено</p>}
    </main>
  );
}

export default SavedMovies;
