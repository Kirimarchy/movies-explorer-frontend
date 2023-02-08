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
  const {email} = currentUser;
  const [isFilter, setFilter] = useState(false);
  const [moviesFetched, setMoviesFetched] = useState([]);
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [isNotFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPopUp, setPopUp] = useState({isOpen: false, successful: true, text: ''});


  useEffect(() => {
    setFilter(localStorage.getItem(`${email}|filter`)==='true' ? true : false );
    submitSearchQuery(localStorage.getItem(`${email}|query`));   
  }, [currentUser]);
  
  
  function submitSearchQuery(query){
      setLoading(true);
      MoviesApi
        .getAllMovies()
        .then(movies => {
          correctApiData(movies);
          setAllMoviesList(movies);
          toLocalStorage(`${email}|moviesFetched`, movies);
          const moviesFiltered = filterByQuery(movies, query);
          setNotFound(moviesFiltered.length===0 ? true : false);
          setMoviesFetched(moviesFiltered);
          toLocalStorage(`${email}|movies`, moviesFetched);
        })
        .catch(() =>
          setPopUp({
            isOpen: true,
            successful: false,
            text: FETCH_ERROR,
          })
        )
        .finally(() => setLoading(false));
        
    localStorage.setItem(`${email}|query`, query);
  }

  function closePopUp() {
    setPopUp({ ...isPopUp, isOpen: false });
  }

  function onChangeFilter(){
    setFilter(!isFilter);
    localStorage.setItem(`${email}|filter`, !isFilter);
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
        <MoviesCardList movies = {isFilter? filterByDuration(moviesFetched) : moviesFetched}/>
      :<Loader/>}
      {isNotFound&&<p>Ничего не найдено</p>}
      <PopUp status={isPopUp} onClose={closePopUp}/>
    </main>
  );
}

export default Movies;
