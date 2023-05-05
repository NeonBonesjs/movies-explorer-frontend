import "./FooterLink.css";
export default function FooterLink({title, url}) {
    return(
        <li>
            <a href={url} className='footer__link'>
                {title}
            </a>
        </li>
    )
}