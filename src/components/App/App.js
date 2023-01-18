//IMPORTS
import './App.css';
import {useState, useEffect} from "react";
import {BrowserRouter, useNavigate} from "react-router-dom";
import CurrentUserContext from "../../utils/context/CurrentUserContext";
import {useNavigation} from "react-router-dom";

//COMPONENTS
import PreLoader from "../PreLoader/PreLoader";


function App() {

  //STATE
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true')
  const [load, setLoad] = useState(false);
  const [isLoader, setIsLoader] = useState(false);




  //HOOKS

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
    <div className="app">
      {!load ? (
        <PreLoader isOpen={isLoader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={headerEndpoints}>
            <Header
              loggedIn={loggedIn}
            />
          </Route>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/signup'>
              {!loggedIn ? (
                <Register handleRegister={handleRegister} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <Route exact path='/signin'>
              {!loggedIn ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              setIsLoader={setIsLoader}
              setIsInfoTooltip={setIsInfoTooltip}
              savedMoviesList={savedMoviesList}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMoviesList={savedMoviesList}
              onDeleteClick={handleDeleteMovie}
              setIsInfoTooltip={setIsInfoTooltip}
            />
            <ProtectedRoute
              path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              handleProfile={handleProfile}
              handleSignOut={handleSignOut}
            />
            <Route path='*'>
              <NotFound goBack={goBack} />
            </Route>
          </Switch>
          <Route exact path={footerEndpoints}>
            <Footer />
          </Route>
          <Preloader isOpen={isLoader} />
          <InfoTooltip
            status={isInfoTooltip}
            onClose={closeInfoTooltip}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
