import './Register.css';
import logo from '../../images/logo.svg';
import FormPage from '../FormPage/FormPage';
export default function Register() {
    return(
        <FormPage
        welcome={'Добро пожаловать!'}
        button={'Зарегестироваться'}
        href={'/signin'}
        link ={'Уже зарегестрированы?'}
        linkBlue={'Войти'}
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
                   <div className='form-page__input-box'>
                       <span className='form-page__input-title'>
                           Пароль
                       </span>
                       <input className='form-page__input'>

                       </input>
                       <span className='form-page__input-error'>

                       </span>
                   </div>
                   </>
        } />
    )
}