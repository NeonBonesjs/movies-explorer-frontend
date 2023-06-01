import './App.css';
import { useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
// import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';
import Popup from '../Popup/Popup';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterUser = (email, pass, name) => {
    auth.register(name, email, pass)
      .then((res) => {
        if(res){
          handleLoginUser(email, pass)
        }
      })
      .catch(e => setError(e.message))
  }

  const handleLoginUser = (email, pass) => {
    auth.authorize(email, pass)
      .then((res) => {
        if(res.token){
          setLoggedIn(true);
          navigate('/movies');
        }
      })
    
      .catch(e => setError(e.message))
  }

  const handleChangeUserInfo = (name, email) => {
    mainApi.editCurrentUserInfo({name, email}, token)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email
        })
      })
      .catch(e => {
        setCurrentUser(currentUser)
        setError(e.message)
      })
  }

  useEffect(() => {
    if(token) {
      auth.getUserInfo(token)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((e) => {
          console.log(e);
          setLoggedIn(false);
        })
    }
  }, [token]);

  useEffect(() => {
    if(loggedIn && (location.pathname === '/signup' || location.pathname === '/signin')) {
      navigate('/movies')
    } 
  }, [location, loggedIn, navigate])

  useEffect(() => {
    if(!token) {
      setLoggedIn(false);
      setCurrentUser({
        name: '',
        email: '',
      })
    }
  }, [token]);

  useEffect(() => {
    if(loggedIn) {
      mainApi.getSavedMovies(token)
        .then((res) => {
          const ownSavedFilms = res.movies.filter((film) => 
            film.owner === currentUser._id
          )
          setSavedMovies(ownSavedFilms)
        })
        .catch(e => console.log(e))
    }
  }, [loggedIn, currentUser, token, setSavedMovies])

  return (
    <AppContext.Provider value={{currentUser, loggedIn, setCurrentUser}}>
    
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
         
        <Route path='/movies' element={<ProtectedRoute component={Movies} loggedIn={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies}/>} />

        <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />} />

        <Route path='/profile' element={<ProtectedRoute component={Profile} loggedIn={loggedIn} submitHandler={handleChangeUserInfo} popupError={error}/>} />

        <Route path='/signup' element={<Register submitHandler={handleRegisterUser}/>}/>

        <Route path='/signin' element={<Login submitHandler={handleLoginUser} /> } />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Popup isActive={true} errorText={error} setErrorText={setError}/>
    </div>
    </AppContext.Provider>
  );
}

export default App;
