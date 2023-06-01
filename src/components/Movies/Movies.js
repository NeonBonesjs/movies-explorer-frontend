import { useEffect, useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { filterMovies, filterShortMovies } from '../../utils/filter';
import { useWidthBrowser } from '../../hooks/useWidthBrowser';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';
import {
    DEFAULT_ERROR_MESSAGE,
    LAPTOP_WIDTH,
    LARGE_NEXT_PAGE_CARDS_COUNT,
    LARGE_PAGE_CARDS_COUNT,
    MOBILE_WIDTH,
    MEDIUM_NEXT_PAGE_CARDS_COUNT,
    MEDIUM_PAGE_CARDS_COUNT,
    SMALL_PAGE_CARDS_COUNT,
    SMALL_NEXT_PAGE_CARDS_COUNT,
    ADDING_PAGE_AMOUNT
} from '../../utils/constants';
export default function Movies({
    savedMovies,
    setSavedMovies
}) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialCards, setInitialCards] = useState(0);
    const [cardsOnPage, setCardsOnPage] = useState(0);
    const [cardsInBundle, setCardsInBundle] = useState(0); 
    const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
    const [visibleButton, setVisibleButton] = useState(false);
    const [lastSearchQuery, setLastSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const cardsCount = initialCards + cardsInBundle * cardsOnPage;
    let allMovies = localStorage.getItem("allMoviesData");
    const width = useWidthBrowser();
    const queryData = localStorage.getItem("queryData");
    const token = localStorage.getItem("token");

    const removeAllMoviesData = () => localStorage.removeItem("allMoviesData");


    useEffect(() => {
        if (queryData) {
          setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
          setShortFilmsCheck(JSON.parse(queryData)?.isOnlyShorts);
        }
    }, [queryData]);

    let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
    let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

    useEffect(() => {
        if (width >= LAPTOP_WIDTH) {
          setInitialCards(LARGE_PAGE_CARDS_COUNT);
          setCardsInBundle(LARGE_NEXT_PAGE_CARDS_COUNT);
        } else if (width > MOBILE_WIDTH && width < LAPTOP_WIDTH) {
          setInitialCards(MEDIUM_PAGE_CARDS_COUNT);
          setCardsInBundle(MEDIUM_NEXT_PAGE_CARDS_COUNT);
        } else if (width <= MOBILE_WIDTH) {
          setInitialCards(SMALL_PAGE_CARDS_COUNT);
          setCardsInBundle(SMALL_NEXT_PAGE_CARDS_COUNT);
        }
    }, [width]);

    useEffect(() => {
        if (!errorMessage) {
          shortFilmsCheck
            ? setMovies(filteredShortMovies.slice(0, cardsCount))
            : setMovies(filteredMovies.slice(0, cardsCount));
        }
    }, [shortFilmsCheck, cardsCount, errorMessage]);
    
    useEffect(() => {
        if (queryData) {
          const updatedQueryData = JSON.parse(queryData);
          updatedQueryData.isOnlyShorts = shortFilmsCheck;
          localStorage.setItem("queryData", JSON.stringify(updatedQueryData));
        }
    }, [shortFilmsCheck, queryData]);

    useEffect(() => {
        window.addEventListener("beforeunload", removeAllMoviesData);
        return () => {
          window.removeEventListener("beforeunload", removeAllMoviesData);
        };
    }, []);

    const submitHandler = async (isOnlyShorts, searchQuery) => {
        try {
            setIsLoading(true);
            if(!allMovies) {
                const allMoviesData = await moviesApi.getMovies();
                localStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
                allMovies = localStorage.getItem("allMoviesData");
            }

            filteredMovies = filterMovies(searchQuery, JSON.parse(allMovies));
            filteredShortMovies = filterShortMovies(filteredMovies);

            const queryData = {
                filteredMovies,
                filteredShortMovies,
                searchQuery,
                isOnlyShorts,
            };
            localStorage.setItem("queryData", JSON.stringify(queryData));

            if(isOnlyShorts) {
                setMovies(filteredShortMovies.slice(0, initialCards));
                if(filteredShortMovies.length === 0) {
                    setResultMessage("Ничего не найдено.")
                }
            } else{
                setMovies(filteredMovies.slice(0, initialCards))
                if (filteredMovies.length === 0) {
                    setResultMessage("Ничего не найдено.")
                }
            };
            setErrorMessage("");
            setIsLoading(false);
        }
        catch (err) {
            setMovies([]);
            setErrorMessage(DEFAULT_ERROR_MESSAGE);
            console.log(err);
            setIsLoading(false);
        }
    }

    const handleButtonMoreClick = () =>
    setCardsOnPage((prev) => prev + ADDING_PAGE_AMOUNT);

    useEffect(() => {
        if(shortFilmsCheck) {
            if(cardsCount < filteredShortMovies.length && !isLoading) {
                setVisibleButton(true)
            } else {
                setVisibleButton(false)
            }
        } else {
            if(cardsCount < filteredMovies.length && !isLoading) {
                setVisibleButton(true)
            } else {
                setVisibleButton(false)
            }
        }
    }, [cardsCount, filteredShortMovies, filteredMovies, isLoading, shortFilmsCheck]);

    const likeMovie = (movie, setLike) => {
        mainApi.createMovie(movie, token)
            .then((res) => {
                setSavedMovies([...savedMovies, res]);
                setLike(true);
            })
            .catch(e => console.log(e))
    }

    const deleteMovie = (movie, setLike) => {
        const searchedMovie = savedMovies.find((film) => film.movieId === movie.id);
        if(searchedMovie){
            mainApi.removeMovie(searchedMovie._id, token)
            .then(() => {
                setLike(false);
                const newMovies = savedMovies.filter((film) => film._id !== searchedMovie._id);
                setSavedMovies(newMovies);
            })
            .catch(e => console.log(e))
        }
        
    }


    return(
        <>
        <Header/>
        <main>
            <SearchForm onSubmit={submitHandler} check={shortFilmsCheck} setCheck={setShortFilmsCheck} lastSearchQuery={lastSearchQuery}/>
            {isLoading ? 
                <Preloader/> : 
                <MoviesCardList
                movies={movies} error={errorMessage} resultMessage={resultMessage} onLikeMovie={likeMovie} onDeleteMovie={deleteMovie} savedMovies={savedMovies}/> 
            }
            <ButtonMore handleClick={handleButtonMoreClick} buttonVisible={visibleButton}/>
        </main>
        <Footer/>
        </>
    )
}