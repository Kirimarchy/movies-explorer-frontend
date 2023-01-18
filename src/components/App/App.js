//IMPORTS
import './App.css';
import {useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import CurrentUserContext from "../../utils/context/CurrentUserContext";
import {useNavigation} from "react-router-dom";
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

  // const location = useLocation(); //не работает вне роутера
  // const navigate = useNavigate();

  const [loadingPage, setLoadingPage] = useState(false);
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

  //HOOKS


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

  // удаление фильма
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

  //RENDERING
  return (
    <main className="app">

      //TODO set "!" after app launches
      {!loadingPage ? (
        <PreLoader isOpen={isLoader} />
      ) : (
        <>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
                  <Route exact path={endpointsHeader}
                         element={<Header loggedIn={loggedIn}/>}
                  />
                  <Route exact path='/'
                         element = {<Main/>}
                  />
                  <Route exact path='/signup'
                         element={!loggedIn ? (
                            <Register handleRegister={handleRegister} />
                          ) : (
                            <Main/>
                         )}
                  />
                  <Route exact path='/signin'
                         element={!loggedIn ? (
                            <Login handleLogin={handleLogin} />
                          ) : (
                            <Main/>
                         )}
                  />
                  <Route exact path='/movies'
                         element={<ProtectedRoute
                                      path='/movies'
                                      component={Movies}
                                      loggedIn={loggedIn}
                                      setIsLoader={setIsLoader}
                                      setInfoTooltip={setInfoTooltip}
                                      savedMoviesList={savedMoviesList}
                                      onLikeClick={handleSaveMovie}
                                      onDeleteClick={handleDeleteMovie}
                                   />
                         }
                  />
                  <Route exact path='/movies'
                         element={<ProtectedRoute
                                       path='/saved-movies'
                                       component={SavedMovies}
                                       loggedIn={loggedIn}
                                       savedMoviesList={savedMoviesList}
                                       onDeleteClick={handleDeleteMovie}
                                       setInfoTooltip={setInfoTooltip}
                                  />
                         }
                  />
                  <Route exact path='/profile'
                         element={<ProtectedRoute
                                        path='/profile'
                                        component={Profile}
                                        loggedIn={loggedIn}
                                        handleUpdateProfile={handleUpdateProfile}
                                        handleSignOut={handleSignOut}
                                    />
                         }
                  />
                  <Route path='*'
                         element={<NotFound/>}
                  />
                  <Route exact path={endpointsFooter}
                         element={<Footer/>}
                  />
          <Routes/>

          <PreLoader isOpen={isLoader} />
          <InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />

        </CurrentUserContext.Provider>
      </>
      )}
    </main>
  );
}

export default App;
