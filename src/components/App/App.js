import './App.css';
import {useState, useEffect} from "react";
import {Navigate, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation} from "react-router-dom";
import CurrentUserContext from '../../utils/context/CurrentUserContext';
import {useNavigation} from "react-router-dom";
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import NotFound from '../pages/NotFound/NotFound';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import ProtectedRoute from '../HOCs/ProtectedRoute';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState( currentUser ? true : false );
  useEffect(()=>{
    console.log(localStorage.getItem('isAuth'))

  }, [localStorage.getItem('isAuth'), location]);
  


  //ROUTING

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = '/' element = {<Header/>}>
        <Route index element = {<Navigate to = '/about'/>}/>
        <Route path = '/about' exact element = {<Main/>}/>
        <Route path = '/signin' exact element = {<Login/>}/>
        <Route path = '/signup' exact element = {<Register/>}/>
        <Route path = '/profile' exact element ={<ProtectedRoute isAuth={isAuth} child={<Profile/>}/>}/>      
        <Route path = '/movies' exact element = {<ProtectedRoute isAuth={isAuth} child={<Movies/>}/>}/>
        <Route path = '/saved-movies' exact element = {<ProtectedRoute isAuth={isAuth} child={<SavedMovies/>}/>}/>
        <Route path = '*' exact element = {<NotFound/>}/>          
      </Route>
    )
  );

  //RENDERING

  return (
    <main className="app">
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <RouterProvider router = {router} fallbackElement = {<Loader/>}/>
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;