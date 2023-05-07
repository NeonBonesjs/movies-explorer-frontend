import './AboutProject.css';
import Title from '../Title/Title';
import Container from '../Container/Container';
export default function AboutProject() {
    return(
        <section className='about-project' id='about-project'>
            <Container modifier={'container_type_landing'}>
            <Title title="О проекте" />
            <div className='about-project__cards'>
                <div className='about-project__card'>
                    <h3 className='about-project__subtitle'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='about-project__text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className='about-project__card'>
                    <h3 className='about-project__subtitle'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='about-project__text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className='about-project__timeline'>
                <div className='about-project__box-title'>
                    1 неделя
                </div >
                <div className='about-project__box-title'>
                    4 недели
                </div>
                <p className='about-project__box-subtitle'>
                    Back-end
                </p>
                <p className='about-project__box-subtitle'>
                    Front-end
                </p>
            </div>
            </Container>
        </section>
    )
}