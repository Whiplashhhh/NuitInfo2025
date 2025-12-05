import React from 'react';
import './Game.css';

// Définition de ce qu'est un objet
export interface Item {
    id: number;
    x: number;
    y: number;
    type: 'bad' | 'good'; // 'bad' = menace, 'good' = solution
    emoji: string;
    speed: number;
}

interface GameItemProps {
    item: Item;
    onClick: (id: number) => void;
}

const GameItem: React.FC<GameItemProps> = ({ item, onClick }) => {
    return (
        <div
            className={`falling-item ${item.type === 'good' ? 'item-converted' : ''}`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            onMouseDown={() => onClick(item.id)} // onMouseDown est plus réactif que onClick
        >
            {item.emoji}
        </div>
    );
};

export default GameItem;