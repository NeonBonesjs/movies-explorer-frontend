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
  const [popupText, setPopupText] = useState('');
  const [sucsess, setSucsess] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        navigate("/movies");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, loggedIn, navigate, location.pathname]);

  useEffect(() => {
    if(loggedIn) {
      auth.getUserInfo(token)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((e) => {
          console.log(e);
          setLoggedIn(false);
        })
    }
  }, [loggedIn, setCurrentUser, token]);



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


  const handleRegisterUser = (email, pass, name) => {
    auth.register(name, email, pass)
      .then((res) => {
        if(res){
          handleLoginUser(email, pass)
        }
      })
      .catch(e => setPopupText(e.message))
  }

  const handleLoginUser = (email, pass) => {
    auth.authorize(email, pass)
      .then((res) => {
        if(res.token){
          setLoggedIn(true);
          navigate('/movies');
        }
      })
    
      .catch(e => setPopupText(e.message))
  }

  const handleChangeUserInfo = (name, email) => {
    mainApi.editCurrentUserInfo({name, email}, token)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email
        })
        setSucsess(true);
        setPopupText('Данные успешно изменены')
      })
      .catch(e => {
        setCurrentUser(currentUser)
        setPopupText(e.message)
      })
  }

  return (
    <AppContext.Provider value={{currentUser, loggedIn, setCurrentUser}}>
    
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
         
        <Route path='/movies' element={<ProtectedRoute component={Movies} loggedIn={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies}/>} />

        <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />} />

        <Route path='/profile' element={<ProtectedRoute component={Profile} loggedIn={loggedIn} submitHandler={handleChangeUserInfo} popupText={popupText} />} />

        <Route path='/signup' element={<Register submitHandler={handleRegisterUser}/>}/>

        <Route path='/signin' element={<Login submitHandler={handleLoginUser} /> } />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Popup popupText={popupText} setPopupText={setPopupText} sucsess={sucsess} setSucsess={setSucsess}/>
    </div>
    </AppContext.Provider>
  );
}

export default App;
