import './App.css';
import {useState, useEffect} from "react";
import AppRouter from "../AppRouter/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {AuthContext} from "../../utils/context/AuthContext";
import {useNavigation} from "react-router-dom";


function App() {

  //DECLARATIONS
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  useEffect(()=>{setIsAuth(!isAuth)}, [localStorage.getItem('isAuth')]);

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