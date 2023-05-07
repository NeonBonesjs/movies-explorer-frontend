import './Footer.css';
import Container from '../Container/Container';
import { footerLinks } from '../../utils/constants';
import FooterLink from '../FooterLink/FooterLink';
export default function Footer() {
    return(
        <footer className='footer'>
            <Container>
                <h3 className='footer__title'>
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </h3>
                <div className='footer__copy-links'>
                    <p className='footer__copy'>
                    © 2020
                    </p>
                    <nav>
                        <ul className='footer__links'>
                        {footerLinks.map((footerLink) => (
                            <FooterLink key={footerLink.id} {...footerLink} />
                        ))}  
                        </ul>
                    </nav>
                </div>
            </Container>
        </footer>
    )
}