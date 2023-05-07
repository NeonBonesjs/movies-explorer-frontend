import './Login.css';
import FormPage from '../FormPage/FormPage';

export default function Login() {
    return(
        <FormPage
        welcome={'Рады видеть!'}
        button={'Войти'}
        href={'/signup'}
        link ={'Ещё не зарегестрированы?'}
        linkBlue={'Регистрация'}
        children={
            <>
            <div className='form-page__input-box'>
                       <span className='form-page__input-title'>
                           Имя
                       </span>
                       <input className='form-page__input'>

                       </input>
                       <span className='form-page__input-error'>

                       </span>
                 </div>
                   <div className='form-page__input-box'>
                       <span className='form-page__input-title'>
                           E-mail
                       </span>
                       <input className='form-page__input'>

                       </input>
                       <span className='form-page__input-error'>

                       </span>
                   </div>
                   <div className='form-page__empty-box'>
                       
                   </div>
                   </>
        } />
    )
}