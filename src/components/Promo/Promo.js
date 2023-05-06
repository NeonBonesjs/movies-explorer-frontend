import './Promo.css';
export default function Promo() {
    return(
        <section className="promo">
            <div className='promo__box'>
                <h2 className="promo__text">
                    Учебный проект студента факультета Веб-разработки.
                </h2>
            </div>
            <div className="promo__buttons">
                <a href='#about-project'>
                    <button className='promo__button'>
                        О проекте
                    </button>
                </a>
                <a href='#techs'>
                    <button className='promo__button'>
                        Технологии
                    </button>
                </a>
                <a href='#about-me'>
                    <button className='promo__button'>
                        Студент
                    </button>
                </a>
            </div>
        </section>
    )
}