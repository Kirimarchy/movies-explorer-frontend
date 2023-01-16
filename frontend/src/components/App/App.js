import React from "react";
import './App.css';
import AppRouter from "../AppRouter/AppRouter";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {BrowserRouter} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <Header/>
          <AppRouter/>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
