import React from "react";
import "../../ressources/css/footer.css";
import LogoReviveSVG from "../../ressources/images/LogoReviveSVG.svg";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Colonne gauche */}
        <nav className="footer-left">
          <a href="#home">Accueil</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Colonne centre */}
        <div className="footer-center">
          <img src={LogoReviveSVG} alt="Logo Revive" className="footer-logo" />
          <div className="footer-bottom">
            &copy; 2025 Tous droits réservés
          </div>
        </div>

        {/* Colonne droite */}
        <div className="footer-right">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;