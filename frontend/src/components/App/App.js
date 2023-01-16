import './App.css';
import {useState, useEffect} from "react";
import AppRouter from "../AppRouter/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";


function App() {

  return (
      <BrowserRouter>
              <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
