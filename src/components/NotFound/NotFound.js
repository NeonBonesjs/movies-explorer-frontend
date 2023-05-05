import './NotFound.css';

export default function NotFound() {
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
            <a href='#' className='notfound__link'>
                Назад
            </a>
            
        </main>
    )
}