import './App.css';
import {useState, useEffect} from "react";
import AppRouter from "../AppRouter/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";
import CurrentUserContext from "../../utils/context/CurrentUserContext";
import {useNavigation} from "react-router-dom";


function App() {

  //DECLARATIONS
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')
  useEffect(()=>{
    console.log(localStorage.getItem('isAuth'))
    // setIsAuth(!isAuth)
  }, [localStorage.getItem('isAuth')]);

  //HANDLERS

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    mainApi
      .createUser(name, email, password)
      .then(data => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi
      .login(email, password)
      .then(jwt => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
          setIsInfoTooltip({
            isOpen: true,
            successful: true,
            text: 'Добро пожаловать!',
          });
        }
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleLogOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleProfile({ name, email }) {
    setIsLoader(true);
    mainApi
      .updateUser(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

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
