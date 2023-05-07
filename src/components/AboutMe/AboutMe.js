import './AboutMe.css';
import Title from '../Title/Title';
import Container from '../Container/Container';
import { projects } from '../../utils/constants';
import Project from '../Project/Project';
const AboutMe = () => {
    return(
        <section className='about-me' id='about-me'>
            <Container modifier={'container_type_landing'}>
                <Title title='Cтудент'/>
                <div className='about-me__student'>
                    <div className='about-me__student-info'>
                        <h3 className='about-me__name'>
                            Андрей
                        </h3>
                        <p className='about-me__about'>
                            Начинающий фронтенд-разработчик, 24 года
                        </p>
                        <p className='about-me__description'>
                            Я живу в Ивановской области, закончил институт по инженерной специальности,
                            в 2022 году начал изучать веб-разработку, мне нравится писать код,
                            постоянно изучая что-то новое. 
                        </p>
                        <a href='https://github.com/NeonBonesjs' className='about-me__link'>
                            GitHub
                        </a>
                    </div>
                    <img src='https://krot.info/uploads/posts/2022-03/1646298189_8-krot-info-p-smeshnie-siba-inu-smeshnie-foto-9.jpg' className='about-me__photo'></img>
                </div>
                <div className='about-me__portfolio'>
                    <h3 className='about-me__portfolio-title'>
                        Портфолио
                    </h3>
                    <ul className='about-me__projects'>
                        {projects.map((project) => (
                            <Project key={project.id} {...project} />
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    )
};
export default AboutMe;