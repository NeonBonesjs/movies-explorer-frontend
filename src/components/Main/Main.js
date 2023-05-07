import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from '../AboutMe/AboutMe';
import Footer from "../Footer/Footer";
export default function Main(props) {
    return(
        <>
        <Header/>
        <main>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
        </main>
        <Footer/>
        </>
    )
}