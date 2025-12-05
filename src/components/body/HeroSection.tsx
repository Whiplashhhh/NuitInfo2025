import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assure-toi d'avoir installé react-router-dom
import './Body.css';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/game'); // Redirige vers la route de ton jeu
  };

  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Le Village Numérique Résistant <br /> a besoin de toi !
      </h1>
      <p className="hero-subtitle">
        L'Empire des Big Tech menace nos écoles avec l'obsolescence programmée.
        Rejoins la démarche NIRD (Numérique Inclusif, Responsable et Durable) et sauve le matériel !
      </p>

      {/* Le Gros Bouton JOUER */}
      <div className="cta-container">
        <button className="play-button" onClick={handlePlayClick}>
          🎮 LANCER LA MISSION
        </button>
        <p className="cta-subtext">Prêt à relever le défi ?</p>
      </div>
    </section>
  );
};

export default HeroSection;