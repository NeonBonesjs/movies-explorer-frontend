import './Register.css';
import FormPage from '../FormPage/FormPage';
import { useCustomValidation } from '../../hooks/useCustomValidation';
import { useFormValidation } from '../../hooks/useFormValidation';
import { countInputs } from '../../utils/countInput';
export default function Register({
    submitHandler,

}) {
    const amountInput = countInputs('.form-page__input');
    const { values, errors, handleChange, isFormValid, setIsFormValid} = useCustomValidation();
    useFormValidation(values, errors, amountInput, setIsFormValid);

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(values["email"], values["password"], values["name"])
    }

    return(
        <FormPage
        onSubmit={onSubmit}
        welcome={'Добро пожаловать!'}
        button={'Зарегестироваться'}
        href={'/signin'}
        link ={'Уже зарегестрированы?'}
        linkBlue={'Войти'}
        isFormValid={isFormValid}
        children={
            <>
            <div className='form-page__input-box'>
                       <span className='form-page__input-title'>
                           Имя
                       </span>
                       <input 
                            className='form-page__input'
                            name='name' value={values['name'] || ''}
                            onChange={handleChange}
                            type='text'>

                       </input>
                       <span className='form-page__input-error'>
                            {errors['name']}
                       </span>
                 </div>
                   <div className='form-page__input-box'>
                       <span className='form-page__input-title'>
                           E-mail
                       </span>
                       <input 
                            className='form-page__input'
                            name="email"
                            label="E-mail"
                            modifier="unauth"
                            value={values["email"] || ""}
                            onChange={handleChange}
                            type="email">

                       </input>
                       <span className='form-page__input-error'>
                            {errors["email"]}
                       </span>
                   </div>
                   <div className='form-page__input-box'>
                       <span className='form-page__input-title'>
                           Пароль
                       </span>
                       <input
                            className='form-page__input'
                            name="password"
                            label="Пароль"
                            modifier="unauth"
                            value={values["password"] || ""}
                            onChange={handleChange}
                            type="password">

                       </input>
                       <span className='form-page__input-error'>
                            {errors["password"]}
                       </span>
                   </div>
                   </>
        } />
    )
}