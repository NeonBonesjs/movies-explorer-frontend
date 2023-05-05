import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ButtonMore from '../ButtonMore/ButtonMore';
export default function Movies() {
    return(
        <>
        <Header/>
        <SearchForm/>
        <MoviesCardList/>
        <ButtonMore />
        <Footer/>
        </>
    )
}