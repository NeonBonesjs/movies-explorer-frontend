import './Popup.css';
import error from '../../images/error.svg';
import close from '../../images/Close.svg';

export default function Popup({errorText, setErrorText}) {
    const closePopup = () => {
        setErrorText('')
    }

    return(
        <div className={`popup ${errorText ? 'popup_active' : ''}`}>
            <div className='popup__window'>
                <img src={error} className='popup__image' alt='ошибка'/>
                <h2 className='popup__text'>{errorText}</h2>
                <button className='popup__close' onClick={closePopup}>
                    <img src={close} alt='Закрыть' className='popup__close-image' />
                </button>
            </div>
        </div>
    )
}

