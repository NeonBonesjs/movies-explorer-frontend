import { useState, useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { AppContext } from '../../context/AppContext';
import logo from '../../images/logo.svg'
import Container from '../Container/Container';
export default function Header(props) {
    const [active, setActive] = useState(false);
    const handleButton = () => {
       setActive(!active);
    };
    const { loggedIn } = useContext(AppContext);


    return(
        <Container>
            <header className="header">
                {/* <div className="header__logo-nav"> */}
                    <Link  to='/'>
                        <img src={logo} alt="логотип" className="logo"/>
                    </Link>
                    <div className={`header__log ${loggedIn ? '' : 'header__log_hidden'}`}>
                        <nav className={`header__navigation`}>
                            <NavLink to='/movies' className={({ isActive }) =>isActive ? 'header__link_active' : 'header__link'}>Фильмы</NavLink>
                            <NavLink to='/saved-movies' className={({ isActive }) =>isActive ? 'header__link_active' : 'header__link'}>Сохраненные фильмы</NavLink>
                            
                        </nav>
                        <Link to={'/profile'}>
                            <button className="header__button header__button_type_account">Аккаунт</button>
                        </Link>
                    </div>
                {/* </div> */}
                <div className={`header__buttons ${loggedIn ? '' : 'header__buttons_active'}`}>
                    <Link to='/signup'>
                        <button className="header__button ">Регистрация</button>
                    </Link>
                    <Link to='/signin'>
                        <button className="header__button header__button_type_blue">Войти</button>
                    </Link>
                </div>
                
                <div className={`header__burger ${loggedIn ? 'header__burger_visible' : ''} ${active ? "active" : ""}`} onClick={handleButton}>
                    <span></span>
                </div>
                <div className={`header__popup ${active ? "active" : ""}`}>
                    <div className={`header__menu ${active ? "active" : ""}`}>
                        <nav className='header__menu-nav'>
                            <NavLink className={({ isActive }) =>isActive ? 'header__link_active' : 'header__link'} to='/'>Главная</NavLink>
                            <NavLink className={({ isActive }) =>isActive ? 'header__link_active' : 'header__link'} to='/movies'>Фильмы</NavLink>
                            <NavLink className={({ isActive }) =>isActive ? 'header__link_active' : 'header__link'} to='/saved-movies'>Сохраненные фильмы</NavLink>
                        </nav>
                        <Link to={'/profile'}>
                                <button className="header__button header__button_type_account">Аккаунт</button>
                        </Link>
                    </div>
                </div>
            </header>
        </Container>
    )
}