import Container from '../Container/Container'
import MoviesCard from '../MoviesCard/MoviesCard';
import { hardFilms } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css'
export default function MoviesCardList() {
    return(
        <Container>
            {(hardFilms.length !== 0) ? <section className='movies-cards'>
                {hardFilms.map((film) => {
                    return <MoviesCard image={film.image} duration={film.duration} link={film.image} name={film.name}/>
                })} 
            </section> : <p className='movies-cards__empty'> Нет подходящий фильмов </p> }
            {/* <Preloader/> */}
        </Container>
    )
}