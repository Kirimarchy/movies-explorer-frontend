import './App.css';
import {useState, useEffect} from "react";
import {Navigate, Route, useNavigate, Routes, useLocation} from "react-router-dom";
import CurrentUserContext from '../../utils/context/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import NotFound from '../pages/NotFound/NotFound';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import ProtectedRoute from '../HOCs/ProtectedRoute';
import PopUp from '../PopUp/PopUp';
import { MainApi } from '../../utils/api/MainApi';



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('jwt')));
  const [isLoading, setLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopUp, setPopUp] = useState({isOpen: false, successful: true, text: ''});

  useEffect(() => checkAuthToken(), [isAuth, location.pathname]);
  useEffect(() => getCurrentUser(), [isAuth]);
  useEffect(()=>{ if (isAuth) {getSavedMovies()} },[isAuth, location.pathname]);

  function onCardAction(){
    MainApi.getUserMovies()
    .then(movies => {
      setSavedMovies(movies.filter(movie => movie.owner._id === currentUser._id));
    })
  }
  
  //API CALLS
  function handleRegister(name, email, password) {
    MainApi
    .registerUser(name, email, password)
    .then(handleLogin(email, password));
  }

  function handleLogin(email, password) {
    setLoading(true);
    MainApi
    .loginUser(email,password)
    .then(jwt => {
      if ({jwt}) {
        localStorage.setItem('jwt', jwt.token);
        setIsAuth(true);
        navigate('/movies');
        setPopUp({
          isOpen: true,
          successful: true,
          text: 'Добро пожаловать!',
        });
      }
    })
    .catch(err =>
        console.log(err)
    )
    .finally(() => setLoading(true));
  }

  function handleEditProfile (name, email) {
    setLoading(true);
    MainApi.
      updateUserProfile(name, email)
      .then(data => {
        setCurrentUser(data);
        setPopUp({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch(err =>
        setPopUp({
          isOpen: true,
          successful: false,
          text: err,
        })
        )
      .finally(() => {
        setLoading(false);
      });
  }

  function checkAuthToken () {
    const jwt = localStorage.getItem('jwt');
    setLoading(true);
    if (jwt) {
      MainApi
        .getUser()
        .then(user => {
          if (user) {
            setIsAuth(true);
            setCurrentUser(user);
          }
        })
        .catch(err => setPopUp({ isOpen: true, successful: false, text: err }))
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAuth(false);
      setLoading(false);
    }
  };

  function getCurrentUser () {
    if (isAuth) {
      setLoading(true);
      MainApi
        .getUser()
        .then(user => setCurrentUser(user))
        .catch(err =>
          setPopUp({
            isOpen: true,
            successful: false,
            text: err,
          })
          )
        .finally(() => setLoading(false));
    }
  }

  function getSavedMovies(){
    setLoading(true);
    MainApi.getUserMovies()
    .then(movies => {
      setSavedMovies(movies.filter(movie => movie.owner._id === currentUser._id));
    })
    .catch(err =>
      setPopUp({
        isOpen: true,
        successful: false,
        text: err,
      })
      )
    .finally(() => setLoading(false));
  }

  function closePopUp() {
    setPopUp({ ...isPopUp, isOpen: false });
  }
  
  //RENDERING

  return (
    <main className="app">
      <CurrentUserContext.Provider value={{ currentUser, isAuth, setIsAuth }}>
      <Header/>  
        {!isLoading?
        <Routes>
          <Route path = '/' exact element = {<Navigate to = '/about'/>}/>
          <Route path = '/about' exact element = {<Main/>}/>
          <Route path = '/signin' exact element = {<Login handleSubmit = {handleLogin}/>}/>
          <Route path = '/signup' exact element = {<Register handleSubmit = {handleRegister}/>}/>
          <Route path = '/profile' exact element ={<ProtectedRoute child={<Profile handleSubmit={handleEditProfile}/>}/>}/>      
          <Route path = '/movies' exact element = {<ProtectedRoute child={<Movies savedMovies ={savedMovies} onCardAction={onCardAction}/>}/>}/>
          <Route path = '/saved-movies' exact element = {<ProtectedRoute child={<SavedMovies savedMovies = {savedMovies} onCardAction = {onCardAction}/>}/>}/>
          <Route path = '*' exact element = {<NotFound/>}/>          
        </Routes>
        : <Loader/>}
      <Footer/>
      <PopUp status= {isPopUp} onClose={closePopUp}/>
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;