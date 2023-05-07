import './SavedMovies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies() {
    return(
        <>
        <Header />
        <main className='saved-movies'>
            <SearchForm />
            <MoviesCardList />
        </main>
        <Footer />
        </>
    )
}