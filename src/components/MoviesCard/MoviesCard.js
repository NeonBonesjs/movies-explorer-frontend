import './MoviesCard.css'
export default function MoviesCard(props) {
    return(
        <div className="movies-card">
            <img src={props.link} alt={props.name} className="movies-card__image" />
            <div className="movies-card__title-like">
                <h3 className="movies-card__title">
                    {props.name}
                </h3>
                <div className="movies-card__like">

                </div>
            </div>
            <p className="movies-card__duration">
                {props.duration}
            </p>
        </div>
    )
}