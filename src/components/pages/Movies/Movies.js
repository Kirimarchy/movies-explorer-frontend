import "./Movies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import { MoviesApi } from "../../../utils/api/MoviesApi";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { correctApiData, filterByQuery, filterByDuration } from "../../../utils/utils";
import { FETCH_ERROR } from "../../../utils/constants";
import Loader from "../../Loader/Loader";
import PopUp from "../../PopUp/PopUp";


const Movies = ({savedMovies, onCardAction}) => {
  const {currentUser} = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState(false);
  const [moviesFetched, setMoviesFetched] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [isNotFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setPopUp] = useState({isOpen: false});


  function submitSearchQuery(query){
    if (allMoviesList.length === 0) {
      setIsLoading(true);
      MoviesApi
        .getAllMovies()
        .then(movies => {
          setAllMoviesList(correctApiData(movies));
          localStorage.setItem(
            `${currentUser.email}|allMovies`, 
            JSON.stringify(correctApiData(movies)));
          filterMoviesList(correctApiData(movies), query, isFilter);
        })
        .catch(() =>
          setPopUp({
            isOpen: true,
            successful: false,
            text: FETCH_ERROR,
          })
        )
        .finally(() => setIsLoading(false));
    } else {
      filterMoviesList(allMoviesList, query, isFilter);
    }
    localStorage.setItem(`${currentUser.email}|searchQuery`, query);
    localStorage.setItem(`${currentUser.email}|isFilter`, isFilter);
  }

  function filterMoviesList(movies, query, filter) {
    const moviesList = filterByQuery(movies, query);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setMoviesFetched(moviesList);
    setFilteredMovies(filter? filterByDuration(moviesList) : moviesList);
    localStorage.setItem(
      `${currentUser.email}|movies`,
      JSON.stringify(moviesList)
    );
  } 

  function filterShortMovies() {
    setFilter(!isFilter);

    if (isFilter) {
      setFilteredMovies(filterByDuration(moviesFetched));
    } else {
      setFilteredMovies(moviesFetched);
    }
    localStorage.setItem(`${currentUser.email}|isFilter`, !isFilter);
  }

  useEffect(() => {
    localStorage.getItem(`${currentUser.email}|isFilter`) === 'true' 
      ?  setFilter(true) : setFilter(false);
  }, [currentUser]);


  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email}|movies`)) {
      const movies = JSON.parse(localStorage.getItem(`${currentUser.email}|movies`));
      setMoviesFetched(movies);

      localStorage.getItem(`${currentUser.email}|isFilter`) === 'true' ?
        setFilteredMovies(filterByDuration(movies)) : setFilteredMovies(movies);
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {filterShortMovies} 
      />
      <hr className="movies-separator"/>
      {!isLoading?
        <MoviesCardList 
        movies = {filteredMovies} 
        savedMovies = {savedMovies} 
        onCardAction = {onCardAction}
        />
      :<Loader/>}
      {isNotFound&&<p>Ничего не найдено</p>}
      <PopUp {...isPopUp}/>
    </main>
  );
}

export default Movies;
