import "./Movies.css";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { useState, useEffect, useContext } from "react";
import { MoviesApi } from "../../../utils/api/MoviesApi";
import { correctApiData, filterByQuery, filterByDuration, toLocalStorage, fromLocalStorage} from "../../../utils/utils";
import { FETCH_ERROR } from "../../../utils/constants";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Loader from "../../Loader/Loader";
import PopUp from "../../PopUp/PopUp";
import { useLocation } from "react-router-dom";



const Movies = () => {
  const {currentUser} = useContext(CurrentUserContext);
  const location = useLocation();
  const [isFilter, setFilter] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [isNotFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPopUp, setPopUp] = useState({isOpen: false, successful: true, text: ''});


  useEffect(() => {
    setFilter(localStorage.getItem('filter')==='true' ? true : false );
    if (localStorage.getItem('query')&&fromLocalStorage('moviesBySearch')){
            setMoviesList(fromLocalStorage('moviesBySearch'))
        }  
  }, [currentUser, location.pathname]);
  
  
  function submitSearchQuery(query){

      if(!fromLocalStorage('allMovies')){
        setLoading(true);
        MoviesApi
          .getAllMovies()
          .then(movies => {
            console.log(1, moviesList);
            correctApiData(movies);
            toLocalStorage('allMovies', movies);
            const moviesFounded = filterByQuery(movies, query);
            setNotFound(moviesFounded.length===0 ? true : false);
            setMoviesList(moviesFounded);
            console.log(2, moviesList);
            toLocalStorage('moviesBySearch', moviesFounded);
          })
          .catch(() =>
            setPopUp({
              isOpen: true,
              successful: false,
              text: FETCH_ERROR,
            })
          )
          .finally(() => setLoading(false));
      } else {
        const moviesFoundedLocal = filterByQuery(fromLocalStorage('allMovies'), query);
        setNotFound(moviesFoundedLocal? true : false);
        console.log(3,moviesFoundedLocal);
        setMoviesList(moviesFoundedLocal);
        toLocalStorage('moviesBySearch', moviesFoundedLocal);
        console.log(4, moviesList);
      }
        
    localStorage.setItem('query', query);
  }

  function closePopUp() {
    setPopUp({ ...isPopUp, isOpen: false });
  }

  function onChangeFilter(){
    setFilter(!isFilter);
    localStorage.setItem('filter', !isFilter);
  }  

  return (
    <main className="movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {onChangeFilter} 
      />
      <hr className="movies-separator"/>
      {!isLoading?
        <MoviesCardList movies = {isFilter? filterByDuration(moviesList) : moviesList}/>
      :<Loader/>}
      {isNotFound&&<p>Ничего не найдено</p>}
      <PopUp status={isPopUp} onClose={closePopUp}/>
    </main>
  );
}

export default Movies;
