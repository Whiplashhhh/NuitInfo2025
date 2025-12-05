import React from 'react';
import '../../ressources/css/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="footer-logo-text">REVIVE</span>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ctrl + Alt + Redbull - NIRD - Nuit de l'info</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;