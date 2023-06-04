import './Profile.css'
import Header from '../Header/Header';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomValidation } from '../../hooks/useCustomValidation';
import { useFormValidation } from '../../hooks/useFormValidation';
import { countInputs } from '../../utils/countInput';

export default function Profile({
    submitHandler,
    popupText
}) {
    const amountInput = countInputs('.profile__input')
    const [onChange, setOnChange] = useState(false);
    const { currentUser } = useContext(AppContext);
    const navigate = useNavigate();
    const { values, setValues, errors, handleChange, isFormValid, setIsFormValid} = useCustomValidation(currentUser.name, currentUser.email);
    useFormValidation(values, errors, amountInput, setIsFormValid, currentUser);

    const handleChangeClick = () => {
        setOnChange(true)
    }
    const logOut = () => {
        localStorage.clear();
        navigate('/');
    }
    const onCancel = () => {
        setValues({
            name: currentUser.name,
            email: currentUser.email,
          });
        setOnChange(false);
    }

    const editUserInfo = (e) => {
        e.preventDefault();
        submitHandler(values['name'], values['email']);
        setOnChange(false);
    }

    useEffect(() => {
        setValues({
          name: currentUser.name,
          email: currentUser.email,
        });
      }, [currentUser.name, currentUser.email, setValues]);

    useEffect(() => {
        if(popupText) {
            setValues({
                name: currentUser.name,
                email: currentUser.email,
              });
        }
    }, [popupText, currentUser.name, currentUser.email, setValues])
    return(
        <>
        <Header/>
        <main className='profile'>
            <h2 className='profile__welcome'>{`Привет, ${currentUser.name}`}</h2>
            <form className='profile__name-email' onSubmit={editUserInfo}>
                <div className={`profile__name-string ${onChange ? 'profile__name-string_on-change' : ''}`}>
                    <span className='profile__name-span'>
                        Имя
                    </span>
                    <input className={`profile__input ${onChange ? 'profile__input_on-change' : ''}`} name='name' disabled={onChange ? '' : 'disabled'} onChange={handleChange} value={values['name'] || ''} type='text'>

                    </input>
                    <span className={`profile__error ${onChange ? 'profile__error_on-change' : ''}`}>
                        {errors['name']}
                    </span>
                </div>
                <div className={`profile__email-string ${onChange ? 'profile__email-string_on-change' : ''}`}>
                    <span className='profile__email-span'>
                        E-mail
                    </span>
                    <input className={`profile__input ${onChange ? 'profile__input_on-change' : ''}`} disabled={onChange ? '' : 'disabled'} value={values['email'] || ''} name='email' onChange={handleChange} type='email'>

                    </input>
                    <span className={`profile__error ${onChange ? 'profile__error_on-change' : ''}`}>
                        {errors['email']}
                    </span>
                </div>
                <button className={`profile__change ${onChange ? '' : 'profile__change_visible'}`}  onClick={handleChangeClick} type='button'>
                    Редактировать
                </button>
                <button className={`profile__change ${onChange ? 'profile__change_visible' : ''} ${isFormValid ? '' : 'profile__change_unactive'}`} disabled={isFormValid ? '' : 'disabled'} type='submit'>
                    Сохранить
                </button>
            </form>
            
            <button className='profile__exit' onClick={onChange ? onCancel : logOut}>
                {onChange ? 'Отменить' : 'Выйти из аккаунта'}
            </button>
        </main>
        </>
    )
}