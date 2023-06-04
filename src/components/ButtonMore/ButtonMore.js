import './ButtonMore.css';
import Container from '../Container/Container'
export default function ButtonMore({
    handleClick,
    buttonVisible
}) {
    return(
        <Container>
            <button className={`movies-cards__button ${buttonVisible ? 'movies-cards__button_visible' : ''}`} onClick={handleClick}>
                    Ещё
            </button>
        </Container>
    )
}