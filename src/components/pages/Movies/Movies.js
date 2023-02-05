import "./Movies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import { MainApi } from "../../../utils/api/MainApi";
import { MoviesApi } from "../../../utils/api/MoviesApi";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { correctApiData } from "../../../utils/utils";

const Movies = () => {
  const currentUser = useContext(CurrentUserContext);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isFilter, setFilter] = useState({});
  
  const handleQuery = ( query, isShort ) => {
    setFilter({query, isShort});
  }

  useEffect(()=>{
    MoviesApi.getAllMovies().
      then((res) => {
        setMoviesList(correctApiData(res))
      }).
      catch(err => console.log('Error', err));
  },[]);

  useEffect(()=>{
    MainApi.getUserMovies()
    .then(movies => {
      setSavedMoviesList(movies.filter(movie => movie.owner._id === currentUser._id));
    })
    .catch(err => console.log('Error', err));
  },[]);

  return (
    <main className="movies">
      <SearchForm handleSearch={handleQuery}/>
      <hr className="movies-separator"/>
      <MoviesCardList movies = {moviesList} savedMovies = {savedMoviesList} filter = {isFilter}/>
    </main>
  );
}

export default Movies;
