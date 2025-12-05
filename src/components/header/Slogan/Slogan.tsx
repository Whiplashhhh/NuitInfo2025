import React from 'react';
import './slogan.css';

const Slogan = () => {
    return (
        <div className="banner-section">
            <div className="banner-background">
                <div className="banner-circle"></div>
                <div className="banner-circle"></div>
                <div className="banner-circle"></div>
            </div>

            <div className="banner-content">
                <div className="banner-tag">
                    Pour un numérique éducatif libre et responsable
                </div>

                <h1 className="banner-title">
                    Vers une autonomie numérique
                    <span className="banner-emphasis"> des établissements scolaires</span>
                </h1>

                <p className="banner-description">
                    Réduire nos dépendances numériques, promouvoir les logiciels libres
                    et construire un écosystème éducatif plus éthique et durable.
                </p>

                <div className="banner-pillars">
                    <div className="pillar-card">
                        <div className="pillar-icon">🤝</div>
                        <div className="pillar-info">
                            <strong>Inclusif</strong>
                            <span>Accessible à tous</span>
                        </div>
                    </div>
                    <div className="pillar-card">
                        <div className="pillar-icon">⚖️</div>
                        <div className="pillar-info">
                            <strong>Responsable</strong>
                            <span>Éthique et transparent</span>
                        </div>
                    </div>
                    <div className="pillar-card">
                        <div className="pillar-icon">🌍</div>
                        <div className="pillar-info">
                            <strong>Durable</strong>
                            <span>Sobre et pérenne</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slogan;