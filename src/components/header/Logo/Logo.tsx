import logo from '../../../ressources/images/LogoReviveSVG.svg'
import './logo.css'

const Logo = () => {
    return (
        <div id="image">
            <img src={logo} alt="Revive Logo"/>
        </div>
    );
}

export default Logo