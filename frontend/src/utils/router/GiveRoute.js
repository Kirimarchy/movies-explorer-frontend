import React from 'react';
import {Fragment} from "react";
import {Navigate} from "react-router-dom";
import Movies from "../../components/pages/Movies/Movies";
import SavedMovies from "../../components/pages/SavedMovies/SavedMovies";
import Profile from "../../components/pages/Profile/Profile";
import Login from "../../components/pages/Login/Login";
import Register from "../../components/pages/Register/Register";
import NotFound from "../../components/pages/NotFound/NotFound";
import Main from "../../components/pages/Main/Main";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


// export const publicRoutes = [
//     {path : "/signin",           exact: true,          element: <Login/>},
//     {path : "/signup",           exact: true,          element: <Register/>},
//     {path : "*",                 exact: true,          element: <Navigate to='/signin'/>}
// ]
//
// export const privateRoutes = [
//     {path : "/",                exact: true,         element: <AboutProject/>},
//     { path : "/about",           exact: true,         element: <Fragment><Header/><Main/><Footer/></Fragment>        },
//     { path : "/movies",          exact: true,         element: <Fragment><Header/><Movies/><Footer/></Fragment>      },
//     { path : "/saved-movies",    exact: true,         element: <Fragment><Header/><SavedMovies/><Footer/></Fragment> },
//     { path : "/profile",         exact: true,         element: <Fragment><Header/><Profile/></Fragment>              },
//     {path : "/signin",          exact: true,         element: <Login/>},
//     {path : "/signup",          exact: true,         element: <Register/>},
//     {path : "*",                exact: true,         element: <Navigate to='/about'/>},
// ]

export const allRoutes = [
    { path : "/signin",          exact: true,         element: <Login/>                                              },
    { path : "/signup",          exact: true,         element: <Register/>                                           },
    { path : "/about",           exact: true,         element: <Fragment><Header/><Main/><Footer/></Fragment>        },
    { path : "/movies",          exact: true,         element: <Fragment><Header/><Movies/><Footer/></Fragment>      },
    { path : "/saved-movies",    exact: true,         element: <Fragment><Header/><SavedMovies/><Footer/></Fragment> },
    { path : "/profile",         exact: true,         element: <Fragment><Header/><Profile/></Fragment>              },
    { path : "*",                exact: true,         element: <NotFound/>                                           },
    { path : "/",                exact: true,         element: <Navigate to='/about'/>                               },
]


