import React from 'react';
import './Body.css'; 

interface InfoCardProps {
  emoji: string;
  title: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ emoji, title, text }) => {
  return (
    <div className="info-card">
      <div className="card-icon">{emoji}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
    </div>
  );
};

export default InfoCard;