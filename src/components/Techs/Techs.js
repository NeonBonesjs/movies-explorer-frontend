import './Techs.css';
import Title from '../Title/Title';
import Tech from '../Tech/Tech';
import { Stack } from '../../utils/constants';
import Container from '../Container/Container';
export default function Techs () {
    return(
      <section className="techs" id="techs">
        <Container modifier={'container_type_landing'}>
          <Title title="Технологии" />
          <div className="techs__texts">
            <h3 className="techs__title">7 технологий</h3>
            <p className="techs__description">
              На курсе веб-разработки мы освоили технологии, которые применили в
              дипломном проекте.
            </p>
          </div>
          <ul className="techs__list">
            {Stack.map((tech) => (
              <Tech key={tech} title={tech} />
            ))}
          </ul>
        </Container>
       </section>
    )
}