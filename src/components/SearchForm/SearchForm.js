import './SearchForm.css';
import find from '../../images/find.svg';
import icon from '../../images/icon.svg';
import Container from '../Container/Container';
export default function SearchForm () {
    return(
        <Container>
        <section className='search-form movies__search-form'>
            <form className='search-form__string'>
                <div className='search-form__search-area'>
                    <img src={icon}  alt='лупа' className='search-form__icon'/>
                    <input className='search-form__input' placeholder='Фильм' required>

                    </input >
                    <button className='search-form__submit'>
                        <img src={find} alt='кнопка поиска' />
                    </button>
                </div>
                <div className='search-form__short-films'>
                    <input type='checkbox' className='search-form__checkbox'>
                    
                    </input>
                    <div className='search-form__pseudo'>
                        <span className='search-form__circle'></span>
                    </div>
                    <p className='search-form__checkbox-title'>
                        Короткометражки
                    </p>
                </div>
            </form>
        </section>
        </Container>
    )
}