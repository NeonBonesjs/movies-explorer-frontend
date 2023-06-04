import './MoviesCard.css';
import getDuration from '../../utils/getDuration';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function MoviesCard({
    image,
    name,
    duration,
    onLikeMovie,
    movie,
    savedMovies,
    onDeleteMovie,
    isSavedMoviesPage
}) {
    const [like, setLike] = useState(false);

    const likeHandler = () => {
        const newMovie = {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image:'https://api.nomoreparties.co' + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail:'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN
        }
        onLikeMovie(newMovie, setLike)
    }

    const deleteHandler = () => {
        onDeleteMovie(movie, setLike)
    }

    useEffect(() => {
        if(savedMovies){
            if (savedMovies.some((film) => film.movieId === movie.id)) {
                setLike(true)
            }
        }
        
    }, [savedMovies, movie.id])

    return(
        <div className="movies-card">
            <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
            <img src={isSavedMoviesPage ? image :`https://api.nomoreparties.co${image}`} alt={name} className="movies-card__image" />
            </a>
            <div className="movies-card__title-like">
                <a className="movies-card__title" href={movie.trailerLink} target='_blank' rel='noreferrer'>
                    {name}
                </a>
                <div className={`movies-card__like ${isSavedMoviesPage ? 'movies-card__like_delete' : ''} ${like ? 'movies-card__like_active' : ''}`} onClick={isSavedMoviesPage ? deleteHandler : like ? deleteHandler : likeHandler}>

                </div>
            </div>
            <p className="movies-card__duration">
                {getDuration(duration)}
            </p>
        </div>
    )
}