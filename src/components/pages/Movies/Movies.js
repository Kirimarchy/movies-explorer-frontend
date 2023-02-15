import "./Movies.css";
import { useState, useEffect} from "react";
import { MoviesApi } from "../../../utils/api/MoviesApi";
import { correctApiData, filterByQuery, filterByDuration, toLocalStorage, fromLocalStorage } from "../../../utils/utils";
import { FETCH_ERROR } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Loader from "../../Loader/Loader";
import PopUp from "../../PopUp/PopUp";


const Movies = () => {
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
  }, [location.pathname]);
   
  function submitSearchQuery(query){

      if(!fromLocalStorage('allMovies')){
        setLoading(true);
        MoviesApi
          .getAllMovies()
          .then(movies => {
            correctApiData(movies);
            toLocalStorage('allMovies', movies);
            const moviesFounded = filterByQuery(movies, query);
            setNotFound(moviesFounded.length===0 ? true : false);
            setMoviesList([...moviesFounded]);
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
        setNotFound(moviesFoundedLocal.length===0 ? true : false);
        toLocalStorage('moviesBySearch', moviesFoundedLocal);
        setMoviesList([...moviesFoundedLocal]);
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
