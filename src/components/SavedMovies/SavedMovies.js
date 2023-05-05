import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies() {
    return(
        <>
        <main className='saved-movies'>
            <Header />
            <SearchForm />
            <MoviesCardList />
        </main>
        <Footer />
        </>
    )
}