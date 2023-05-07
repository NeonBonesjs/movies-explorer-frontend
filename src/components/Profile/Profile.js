import './Profile.css'
import Header from '../Header/Header'
export default function Profile(props) {
    return(
        <>
        <Header/>
        <main className='profile'>
            <h2 className='profile__welcome'>{`Привет, ${props.name}`}</h2>
            <form className='profile__name-email'>
                <div className='profile__name-string'>
                    <span className='profile__name-span'>
                        Имя
                    </span>
                    <input className='profile__name-input' disabled value='Имя'>

                    </input>
                </div>
                <div className='profile__email-string'>
                    <span className='profile__email-span'>
                        E-mail
                    </span>
                    <input className='profile__email-input' disabled value='Какой-то эмейл'>

                    </input>
                </div>
            </form>
            <button className='profile__change'>
                Редактировать
            </button>
            <button className='profile__exit'>
                Выйти из аккаунта
            </button>
        </main>
        </>
    )
}