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
  useEffect(()=>{ if (isAuth) {getSavedMovies()} },[isAuth]);

  function onCardAction(){
    MainApi.getUserMovies()
    .then(movies => {
      setSavedMovies(movies.filter(movie => movie.owner._id === currentUser._id));
    })
  }
  

  function handleRegister(name, email, password) {
    setLoading(true);
    MainApi
    .registerUser(name, email, password)
    .then(res => {
      if (res._id) {
        handleLogin(email, password);
      }
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
      setPopUp({
        isOpen: true,
        successful: false,
        text: err,
      })
      )
    .finally(() => setLoading(false));
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
  
  return (
    <main className="app">
      <CurrentUserContext.Provider value={{ currentUser, isAuth, setIsAuth }}>
      <Header/>  
        {!isLoading?
        <Routes>
          <Route 
            path = '/'  
            element = {<Navigate to = '/about'/>}
            />
          <Route 
            path = '/about'  
            element = {<Main/>}
            />
          <Route 
            path = '/signin'  
            element = {<Login handleSubmit = {handleLogin}/>}
            />
          <Route 
            path = '/signup'  
            element = {<Register handleSubmit = {handleRegister}/>}
            />
          <Route 
            path = '/profile'  
            element = {<ProtectedRoute 
                        child={<Profile handleSubmit={handleEditProfile}/>}
                        />}
            />      
          <Route 
            path = '/movies'  
            element = {<ProtectedRoute 
                        child={<Movies savedMovies ={savedMovies} onCardAction={onCardAction}/>}
                        />}
            />
          <Route 
            path = '/saved-movies'  
            element = {<ProtectedRoute 
                        child={<SavedMovies savedMovies = {savedMovies} onCardAction = {onCardAction}/>}
                        />}
            />
          <Route 
            path = '*'  
            element = {<NotFound/>}
            />          
        </Routes> 
        :<Loader/>}
      <Footer/>
      <PopUp status= {isPopUp} onClose={closePopUp}/>
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;