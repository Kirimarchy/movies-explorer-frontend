import './App.css';
import {useState, useEffect} from "react";
import AppRouter from "../AppRouter/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";
import CurrentUserContext from '../../utils/context/CurrentUserContext';
import {useNavigation} from "react-router-dom";


function App() {

  //DECLARATIONS
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')
  useEffect(()=>{
    console.log(localStorage.getItem('isAuth'))

  }, [localStorage.getItem('isAuth')]);

  //APP RENDERING
  return (
    <main className="app">
      <CurrentUserContext.Provider value={{ isAuth, setIsAuth }}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;