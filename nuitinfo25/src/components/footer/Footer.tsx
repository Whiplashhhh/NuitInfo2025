import React from "react";
import "../../ressources/css/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Revive</h2>
        </div>
        <nav className="footer-nav">
          <a href="#home">Accueil</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Revive . Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;