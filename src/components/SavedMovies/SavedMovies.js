import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { filterMovies, filterShortMovies } from '../../utils/filter';
import { mainApi } from '../../utils/MainApi';

export default function SavedMovies({
    savedMovies,
    setSavedMovies
}) {
    const[movies, setMovies] = useState(savedMovies);
    const[errorMessage, setErrorMessage] = useState('');
    const[resultMessage, setResultMessage] = useState('');
    const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
    const[firstSearch, setFirstSearch] = useState(true);
    const token = localStorage.getItem('token');



    let filteredMovies = movies;
    let filteredShortMovies = filterShortMovies(movies);

    useEffect(() => {
        if(firstSearch && !errorMessage) {
            shortFilmsCheck
                ? setMovies(filterShortMovies(savedMovies))
                : setMovies(savedMovies);

        }
    }, [firstSearch, shortFilmsCheck, savedMovies, errorMessage])

    useEffect(() => {
        if (!errorMessage && !firstSearch) {
          shortFilmsCheck
            ? setMovies(filteredShortMovies)
            : setMovies(filteredMovies);
        } 

    }, [shortFilmsCheck, errorMessage]);


    const submitHandler = (isOnlyShorts, searchQuery) => {

        filteredMovies = filterMovies(searchQuery, savedMovies);
        filteredShortMovies = filterShortMovies(filteredMovies);

        const queryDataSavedMovies = {
            filteredMovies,
            filteredShortMovies,
            searchQuery,
            isOnlyShorts
        };
        localStorage.setItem('queryDataSavedMovies', JSON.stringify(queryDataSavedMovies));

        if(isOnlyShorts) {
            setMovies(filteredShortMovies);
            if(filteredShortMovies.length === 0) {
                setResultMessage("Ничего не найдено.")
            }
        } else{
            setMovies(filteredMovies)
            if (filteredMovies.length === 0) {
                setResultMessage("Ничего не найдено.")
            }
        };
        setFirstSearch(false);
        setErrorMessage("");
    }

    const deleteHandler = (movie) => {
        mainApi.removeMovie(movie._id, token)
            .then(() => {
                const newMovies = savedMovies.filter((film) => film._id !== movie._id);
                setSavedMovies(newMovies);
            })
    }

    return(
        <>
        <Header />
        <main className='saved-movies'>
            <SearchForm onSubmit={submitHandler} check={shortFilmsCheck} setCheck={setShortFilmsCheck} />
            <MoviesCardList isSavedMoviesPage={true} movies={movies} error={errorMessage} resultMessage={resultMessage} onDeleteMovie={deleteHandler}/>
        </main>
        <Footer />
        </>
    )
}
