import "./SavedMovies.css";
import SearchForm from "../../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../utils/context/CurrentUserContext";
import { filterByDuration, filterByQuery } from "../../../utils/utils";

const SavedMovies = () => {
  const { userMovies } = useContext(CurrentUserContext);
  const [isFilter, setFilter] = useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState(userMovies);
  const [moviesFiltered, setMoviesFiltered] = useState(userMovies);

  function submitSearchQuery(query){
    const moviesList = filterByQuery(userMovies, query);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setInitialMovies(moviesList);
      // setMoviesFiltered(moviesList);
    }
    console.log('query', userMovies, query, moviesList);
  }
  
  function onChangeFilter(){setFilter(!isFilter)};  
  //   if (isFilter) {
  //     setMoviesFiltered(filterByDuration(initialMovies));
  //   } else {
  //     setMoviesFiltered(initialMovies);
  //   }
  //   setNotFound(moviesFiltered.length === 0 ? true : false );
  // }

  // useEffect(() => {
  //    setInitialMovies(userMovies);
  //    setMoviesFiltered( isFilter ? filterByDuration(userMovies) : userMovies );
  // }, [userMovies.length, isFilter]);

  // function closePopUp() {
  //   setPopUp({ ...isPopUp, isOpen: false });
  // }

  return (
    <main className="saved-movies">
      <SearchForm 
        handleSubmitQuery={submitSearchQuery} 
        isShortFilter = {isFilter} 
        handleShortFilter = {onChangeFilter} 
      />
      <hr className="movies-separator"/>
        <MoviesCardList movies = {isFilter? filterByDuration(initialMovies) : initialMovies }/>
      {isNotFound&&<p>Ничего не найдено</p>}
    </main>
  );
}

export default SavedMovies;
