//IMPORTS
import './App.css';
import {useState, useEffect} from "react";
import {Route, Routes, useNavigation, RouterProvider, createBrowserRouter} from "react-router-dom";
import CurrentUserContext from "../../utils/context/CurrentUserContext";
import mainApi from "../../utils/api/MainApi";


//COMPONENTS
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Main from "../pages/Main/Main";
import Movies from "../pages/Movies/Movies";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PreLoader from "../PreLoader/PreLoader";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedMovies from "../pages/SavedMovies/SavedMovies";


function App() {

  //STATE
  const [load, setLoad] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const endpointsHeader = ['/movies', '/saved-movies', '/profile', '/'];
  const endpointsFooter = ['/movies', '/saved-movies', '/'];

  //HANDLERS

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    mainApi
      .createUser(name, email, password)
      .then(data => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch(err =>
        setInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi
      .login(email, password)
      .then(jwt => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
          setInfoTooltip({
            isOpen: true,
            successful: true,
            text: 'Добро пожаловать!',
          });
        }
      })
      .catch(err =>
        setInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleUpdateProfile({ name, email }) {
    setIsLoader(true);
    mainApi
      .updateUser(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch(err =>
        setInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleSaveMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  function closeInfoTooltip() {
    setInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  //HOOKS
  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then(data => {
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
            history.push(path);
          }
        })
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => {
          setIsLoader(false);
          setLoad(true);
        });
    } else {
      setLoad(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then(res => setCurrentUser(res))
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);


  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then(data => {
          const UserMoviesList = data.filter(m => m.owner === currentUser._id);
          setSavedMoviesList(UserMoviesList);
        })
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, loggedIn]);

  //ROUTES
  const allRoutes = createBrowserRouter([
    {path:  endpointsHeader, element:<Header loggedIn/>},
    {path: 'about',element: <Main/>}
  ])



  //RENDERING
  return (
    <main className="app">

      {/*{!load ? (*/}
      {/*  <PreLoader isOpen={isLoader} />*/}
      {/*) : (*/}
        <CurrentUserContext.Provider value={currentUser}>
          <RouterProvider
            routes={routes}
            fallBackElement = {<PreLoader/>}
          />
          {/*<PreLoader isOpen={isLoader} />*/}
          <InfoTooltip status={isInfoTooltip}/>
        </CurrentUserContext.Provider>
      )}
   </main>
  );
}

export default App;
