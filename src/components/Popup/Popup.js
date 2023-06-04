import './Popup.css';
import error from '../../images/error.svg';
import ok from '../../images/ok.svg';
import close from '../../images/Close.svg';

export default function Popup({popupText, setPopupText, sucsess, setSucsess}) {
    const closePopup = () => {
        setPopupText('');
        setSucsess(false);
    }

    return(
        <div className={`popup ${popupText ? 'popup_active' : ''}`}>
            <div className='popup__window'>
                <img src={sucsess ? ok : error} className='popup__image' alt='ошибка'/>
                <h2 className='popup__text'>{popupText}</h2>
                <button className='popup__close' onClick={closePopup}>
                    <img src={close} alt='Закрыть' className='popup__close-image' />
                </button>
            </div>
        </div>
    )
}

