import './NotFound.css';
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    return(
        <main className='notfound'>
            <div className='notfound__block'>
                <h2 className='notfound__title'>
                    404
                </h2>
                <p className='notfound__subtitle'>
                    Страница не найдена
                </p>
               
            </div>
            <a className='notfound__link' onClick={goBack}>
                Назад
            </a>
            
        </main>
    )
}