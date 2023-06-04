import './FormPage.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
export default function FormPage(props) {
    return(
        <main className='form-page'>
            
            <form className='form-page__form' onSubmit={props.onSubmit}>
                <Link to='/'><img src={logo} className='logo' alt='логотип' /></Link>
                
                <h2 className='form-page__title'>
                    {props.welcome}
                </h2>
                {props.children}
                <button type='submit' className={`form-page__submit ${props.isFormValid ? '' : 'form-page__submit_unactive'}`} disabled={props.isFormValid ? '' : 'disabled'}>
                {props.button}
                </button>
            </form>
            
            <Link className='form-page__link' to={props.href}>
                {props.link} <span className='form-page__link-blue'>{props.linkBlue}</span>
            </Link>
        </main>
    )
}