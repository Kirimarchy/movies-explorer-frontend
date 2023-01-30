import './App.css';
import {useState, useEffect} from "react";
import {Navigate, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation, useNavigate, Routes} from "react-router-dom";
import CurrentUserContext from '../../utils/context/CurrentUserContext';
import {useNavigation} from "react-router-dom";
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
import { MainApi } from '../../utils/api/MainApi';



function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState( currentUser ? true : false );

  useEffect(()=>{
    MainApi.getUser().then(({data}) => setCurrentUser(data)).then(console.log(currentUser));
  }, [isAuth])
  
  //API CALLS
  function handleRegister(name, email, password) {
    MainApi.registerUser(name, email, password)
    .then(handleLogin(email, password));
  }

  function handleLogin(email, password) {

    MainApi.loginUser(email,password)
    .then(jwt => {
      if (jwt.token) {
        localStorage.setItem('jwt', {jwt});
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
  }

  function handleEditProfile (name, email) {

    setIsLoader(true);
    setTimeout(setIsLoader(false), 500);

    currentUser = {name, email};
    localStorage.setItem('User', currentUser);

    setIsPopUp({
      isOpen: true,
      successful: true,
      text: 'Ваши данные обновлены!',
    });

  }

  function closePopUp() {
    setPopUp({ ...isPopUp, isOpen: false });
  }


  //RENDERING

  return (
    <main className="app">
      <CurrentUserContext.Provider value={{ currentUser, isAuth, setIsAuth }}>
      <Header/>  
        <Routes>
          <Route path = '/' exact element = {<Navigate to = '/about'/>}/>
          <Route path = '/about' exact element = {<Main/>}/>
          <Route path = '/signin' exact element = {<Login handleSubmit = {handleLogin}/>}/>
          <Route path = '/signup' exact element = {<Register handleSubmit = {handleRegister}/>}/>
          <Route path = '/profile' exact element ={<ProtectedRoute isAuth={isAuth} child={<Profile handleSubmit={handleEditProfile}/>}/>}/>      
          <Route path = '/movies' exact element = {<ProtectedRoute isAuth={isAuth} child={<Movies/>}/>}/>
          <Route path = '/saved-movies' exact element = {<ProtectedRoute isAuth={isAuth} child={<SavedMovies/>}/>}/>
          <Route path = '*' exact element = {<NotFound/>}/>          
        </Routes>
      <Footer/>  
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;