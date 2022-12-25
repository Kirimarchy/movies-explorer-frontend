import React from "react";
import './App.css';
import AppRouter from "../AppRouter/AppRouter";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function App() {
  return (
      <>
        <Header/>
         <AppRouter/>
        <Footer/>
      </>
  );
}

export default App;
