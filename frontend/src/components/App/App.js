import './App.css';
import {useState, useEffect} from "react";
import AppRouter from "../AppRouter/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {AuthContext} from "../../utils/context/AuthContext";



function App() {

  //DECLARATIONS
  const isAuth = localStorage.getItem('isAuth');
  useEffect(()=>{}, isAuth);

  //APP RENDERING
  return (
    <main className="app">
      <AuthContext.Provider value={isAuth}>
        <BrowserRouter>
                <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
