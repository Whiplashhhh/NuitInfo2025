import React from "react";
import "../../ressources/css/footer.css";
import LogoReviveSVG from "../../ressources/images/LogoReviveSVG.svg";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Colonne gauche */}
        <div className="footer-column">
          <h4 className="footer-title">Navigation</h4>
          <a href="#home">Accueil</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Colonne centrale */}
        <div className="footer-center">
          <img src={LogoReviveSVG} alt="Logo Revive" className="footer-logo" />
          <p className="footer-description">
            Redonner vie, respecter, recycler.
          </p>
          <p className="footer-rights">© {new Date().getFullYear()} Tous droits réservés</p>
        </div>

        {/* Colonne droite */}
        <div className="footer-column">
          <h4 className="footer-title">Réseaux</h4>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;