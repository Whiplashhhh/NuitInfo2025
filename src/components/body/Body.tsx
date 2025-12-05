import React from 'react';
import HeroSection from './HeroSection';
import InfoCard from './InfoCard';
import './Body.css';

const Body: React.FC = () => {
  return (
    <main className="body-container">
      
      {/* 1. La zone d'appel à l'action */}
      <HeroSection />

      {/* 2. La zone d'informations (La grille) */}
      <section className="info-section">
        <h2 className="section-title">Pourquoi rejoindre la Résistance ?</h2>
        
        <div className="cards-grid">
          <InfoCard 
            emoji="⏳"
            title="L'Urgence Windows 10"
            text="La fin du support de Windows 10 va rendre obsolète des milliers d'PC fonctionnels. Ne les laisse pas devenir des déchets !"
          />
          
          <InfoCard 
            emoji="🐧"
            title="L'Arme Linux"
            text="Adopte le logiciel libre ! C'est l'outil ultime pour contrer l'obsolescence et redonner du pouvoir aux utilisateurs."
          />

          <InfoCard 
            emoji="🌱"
            title="Objectif NIRD"
            text="Transforme ton école en un village autonome, éthique et durable. Le Numérique Responsable, c'est l'avenir."
          />
        </div>
      </section>

    </main>
  );
};

export default Body;