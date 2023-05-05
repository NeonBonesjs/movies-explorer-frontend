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
                       <span className='regiser__input-title'>
                           Имя
                       </span>
                       <input className='regiser__input'>

                       </input>
                       <span className='regiser__input-error'>

                       </span>
                 </div>
                   <div className='form-page__input-box'>
                       <span className='regiser__input-title'>
                           E-mail
                       </span>
                       <input className='regiser__input'>

                       </input>
                       <span className='regiser__input-error'>

                       </span>
                   </div>
                   <div className='form-page__empty-box'>
                       
                   </div>
                   </>
        } />
    )
}