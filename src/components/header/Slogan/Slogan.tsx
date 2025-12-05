import img from '../../../ressources/images/SloganIMG.jpg'

const Slogan = () => {
    return (
    <div className="header-slogan">
        <img src={img} alt="Fond Slogan"/>
        <div className="header-slogan-text">
            Agir aujourd’hui pour un digital
            plus juste et durable demain
        </div>
    </div>
    );
}

export default Slogan