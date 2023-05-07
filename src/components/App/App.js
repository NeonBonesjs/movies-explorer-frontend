import './App.css';
import { useState } from 'react';
import { AppContext } from '../../context/AppContext';
// import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Route, Routes } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
function App() {
  const[loggedIn, setLoggedIn] = useState(true);
  return (
    <AppContext.Provider value={loggedIn}>
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
         
        <Route path='/movies' element={<Movies/>} />

        <Route path='/saved-movies' element={<SavedMovies />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/signup' element={<Register />} />

        <Route path='/signin' element={<Login />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
