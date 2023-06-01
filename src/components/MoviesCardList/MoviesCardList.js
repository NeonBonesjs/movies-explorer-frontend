import Container from '../Container/Container'
import MoviesCard from '../MoviesCard/MoviesCard';
import { hardFilms } from '../../utils/constants';
import './MoviesCardList.css'
export default function MoviesCardList({
    movies,
    error,
    resultMessage,
    onLikeMovie,
    savedMovies,
    onDeleteMovie,
    isSavedMoviesPage
}) {
    return(
        <Container>
            {(movies.length !== 0) ? <section className='movies-cards'>
                {movies.map((film) => {
                    return <MoviesCard
                         image={isSavedMoviesPage ? film.image : film.image.url}
                         duration={film.duration} 
                         link={film.image} name={film.nameRU} 
                         key={film.id || film._id} 
                         onLikeMovie={onLikeMovie} 
                         movie={film} 
                         savedMovies={savedMovies} 
                         onDeleteMovie={onDeleteMovie} 
                         isSavedMoviesPage={isSavedMoviesPage}/>
                })} 
            </section> : <p className='movies-cards__empty'>{ error || resultMessage }</p> }
        </Container>
    )
}