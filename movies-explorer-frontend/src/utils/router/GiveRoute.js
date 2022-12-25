import React from 'react';
import {Navigate} from "react-router-dom";
import AboutProject from '../../components/pages/Main/Main'
import Movies from "../../components/pages/Movies/Movies";
import SavedMovies from "../../components/pages/SavedMovies/SavedMovies";
import Profile from "../../components/pages/Profile/Profile";
import Login from "../../components/pages/Login/Login";
import Register from "../../components/pages/Register/Register";

export let publicRoutes = [
    {path : "/signin",           exact: true,          element: <Login/>},
    {path : "/signup",           exact: true,          element: <Register/>},
    {path : "*",                 exact: true,          element: <Navigate to='/login'/>}
]

export const privateRoutes = [
    {path : "/",                exact: true,         element: <AboutProject/>},
    {path : "/about",           exact: true,         element: <AboutProject/>},
    {path : "/movies",          exact: true,         element: <Movies/>},
    {path : "/saved-movies",    exact: true,         element: <SavedMovies/>},
    {path : "/profile",         exact: true,         element: <Profile/>},
    {path : "/signin",          exact: true,         element: <Login/>},
    {path : "/signup",          exact: true,         element: <Register/>},
    {path : "*",                exact: true,         element: <Navigate to='/about'/>},
]


