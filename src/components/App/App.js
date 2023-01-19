//IMPORTS
import './App.css';
import {useState, useEffect} from "react";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
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
          navigate('/movies');
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
    navigate('/');
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
        setInfoTooltip({
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
        setInfoTooltip({
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
          setInfoTooltip({
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
          setInfoTooltip({
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
          setInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, loggedIn]);

  //RENDERING
  return (
    <main className="app">

      {/*{loadingPage ? (*/}
      {/*  <PreLoader isOpen={isLoader} />*/}
      {/*) : (*/}

        <CurrentUserContext.Provider value={currentUser}>
            <Header loggedIn={loggedIn}/>
                    <Routes>
                          <Route exact path='/'
                                 element = {<Main/>}
                          />
                          <Route exact path='/signup'
                                 element= {<Register handleRegister={handleRegister}/>}
                          />
                          <Route exact path='/signin'
                                 element={ <Login handleLogin={handleLogin} />}
                          />
                          <Route exact path='/movies' element={
                            <ProtectedRoute loggedIn = {loggedIn}>
                                     <Movies
                                       loggedIn={loggedIn}
                                       setIsLoader={setIsLoader}
                                       setInfoTooltip={setInfoTooltip}
                                       savedMoviesList={savedMoviesList}
                                       onLikeClick={handleSaveMovie}
                                       onDeleteClick={handleDeleteMovie}
                                     />
                            </ProtectedRoute>
                          }/>

                          <Route exact path='/saved-movies' element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                      <SavedMovies
                                        loggedIn={loggedIn}
                                        setIsLoader={setIsLoader}
                                        setInfoTooltip={setInfoTooltip}
                                        savedMoviesList={savedMoviesList}
                                        onLikeClick={handleSaveMovie}
                                        onDeleteClick={handleDeleteMovie}
                                      />
                            </ProtectedRoute>
                          }/>

                          <Route exact path='/profile' element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                      <Profile
                                        loggedIn={loggedIn}
                                        setIsLoader={setIsLoader}
                                        setInfoTooltip={setInfoTooltip}
                                        handleUpdateProfile={handleUpdateProfile}
                                        handleSignOut={handleSignOut}
                                      />
                            </ProtectedRoute>
                          }/>

                          <Route path='*' element={<NotFound/>}/>
                    </Routes>

                  {/*<PreLoader isOpen={isLoader} />*/}
                  {/*<InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />*/}
                </CurrentUserContext.Provider>
    </main>
  );
}

export default App;
