import './SearchForm.css';
import { useState, useEffect } from 'react';
import find from '../../images/find.svg';
import findUnvalid from '../../images/findUnvalid.svg';
import icon from '../../images/icon.svg';
import Container from '../Container/Container';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useCustomValidation } from '../../hooks/useCustomValidation';
import { countInputs } from '../../utils/countInput';
export default function SearchForm ({
    onSubmit,
    check,
    setCheck,
    lastSearchQuery
}) {

    const [errorText, setErrorText] = useState("");
    const {
        values,
        errors,
        setValues,
        handleChange,
        isFormValid,
        setIsFormValid,
    } = useCustomValidation();
    const amountInputs = countInputs(".search-form__input");

    useFormValidation(values, errors, amountInputs, setIsFormValid);

    const onClickCheckBox = () => setCheck(!check);

     const onSubmitForm = (e) => {
        e.preventDefault();
        if(values['film-query'] === undefined) {
            setErrorText('Запрос не может быть пустым');
            return;
        }
        if(!isFormValid) {
            setErrorText(errors['film-query'])
        } else {
            onSubmit(check, values['film-query']);
            setErrorText('')
        }
        
     }

     useEffect(() => {
        if (lastSearchQuery) {
          setValues({ ...values, "film-query": lastSearchQuery });
        }
      }, [lastSearchQuery, setValues]);

    return(
        <Container>
        <section className='search-form movies__search-form'>
            <form className='search-form__string' onSubmit={onSubmitForm}>
                <div className='search-form__search-area'>
                    <img src={icon}  alt='лупа' className='search-form__icon'/>
                    <input
                    className='search-form__input'
                    placeholder='Фильм'
                    type='text'
                    name='film-query'
                    onChange={handleChange}
                    value={values['film-query'] || ''}>

                    </input >
                    <button className='search-form__submit' type='submit' disabled={isFormValid ? '' : 'disabled'}>
                        <img src={isFormValid ? find : findUnvalid} alt='кнопка поиска'/>
                    </button>
                </div>
                <div className='search-form__short-films'>
                    <input type='checkbox' className='search-form__checkbox' checked={check} onChange={onClickCheckBox}>
                    
                    </input>
                    <div className='search-form__pseudo' onClick={onClickCheckBox}>
                        <span className='search-form__circle'></span>
                    </div>
                    <p className='search-form__checkbox-title'>
                        Короткометражки
                    </p>
                </div>
            </form>
            <p className='search-form__error'>{errorText}</p>
        </section>
        </Container>
    )
}