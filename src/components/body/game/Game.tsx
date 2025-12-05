import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation
import GameItem, { Item } from './GameItem';
import './Game.css';

const Game: React.FC = () => {
    const navigate = useNavigate(); // Hook pour changer de page

    // --- ÉTATS ---
    const [items, setItems] = useState<Item[]>([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'victory'>('start');

    // Nouveau : Message "Popup" à gauche
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

    // Refs
    const frameRef = useRef<number>(0);
    const scoreRef = useRef(0);
    const livesRef = useRef(5); // On garde une ref des vies pour éviter les bugs de sync
    // Ref pour accéder aux items depuis la boucle sans capturer une vieille closure
    const itemsRef = useRef<Item[]>([]);

    const WIN_SCORE = 30;
    const SPAWN_RATE = 50;

    // Synchronisation Ref <-> State pour les vies
    useEffect(() => {
        livesRef.current = lives;
    }, [lives]);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    // Synchroniser itemsRef avec le state items pour que la boucle lise toujours
    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    // --- BOUCLE DE JEU ---
    useEffect(() => {
        let intervalId: number | undefined;

        if (gameState === 'playing') {
            intervalId = window.setInterval(() => {
                // 1. On travaille sur une copie issue de la REF (ce qui évite le bug du double calcul)
                const currentItems = itemsRef.current;
                let damageTaken = 0; // Compteur temporaire de dégâts pour ce tour

                // 2. Calcul des positions et collisions
                const nextItems = currentItems
                    .map(item => ({ ...item, y: item.y + item.speed }))
                    .filter(item => {
                        // Si l'objet touche le sol (90% de la hauteur)
                        if (item.y > 90) {
                            if (item.type === 'bad') {
                                damageTaken++; // On note qu'on a pris un coup (1 coup = 1 point)
                            }
                            return false; // L'objet disparaît
                        }
                        return true; // L'objet continue de tomber
                    });

                // 3. Apparition des nouveaux ennemis
                frameRef.current++;
                if (frameRef.current % SPAWN_RATE === 0) {
                    nextItems.push(spawnEnemy());
                }

                // 4. Application des mises à jour (Une seule fois par frame)
                setItems(nextItems);

                // Si on a pris des dégâts ce tour-ci
                if (damageTaken > 0) {
                    setLives(prevLives => {
                        const newLives = prevLives - damageTaken; // On retire exactement le nombre d'ennemis passés
                        if (newLives <= 0) {
                            // On force le gameover ici pour éviter les décalages
                            setGameState('gameover');
                            return 0;
                        }
                        return newLives;
                    });
                }

                // Vérification victoire
                if (scoreRef.current >= WIN_SCORE) {
                    setGameState('victory');
                }

            }, 50);
        }
        return () => {
            if (intervalId !== undefined) clearInterval(intervalId);
        };
    }, [gameState]);

    // --- FONCTIONS ---

    const spawnEnemy = (): Item => {
        const enemies = [
            { emoji: '👾', name: 'Bug Critique' },
            { emoji: '💾', name: 'Vieux Matériel' },
            { emoji: '💰', name: 'Licence Coûteuse' },
            { emoji: '🕸️', name: 'Obsolescence' }
        ];
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

        return {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10, // Marge de sécurité sur les bords
            y: -10,
            type: 'bad',
            emoji: randomEnemy.emoji,
            speed: Math.random() * 0.8 + 0.5
        };
    };

    const handleItemClick = (id: number) => {
        if (gameState !== 'playing') return;

        setItems(currentItems => currentItems.map(item => {
            if (item.id === id && item.type === 'bad') {
                // Logique de message personnalisé
                let msg: string;
                let newEmoji: string;

                switch(item.emoji) {
                    case '👾':
                        msg = "Bug corrigé par la communauté !";
                        newEmoji = "🛠️";
                        break;
                    case '💾':
                        msg = "PC converti en serveur Linux !";
                        newEmoji = "🐧";
                        break;
                    case '💰':
                        msg = "Économies réalisées !";
                        newEmoji = "📉";
                        break;
                    default:
                        msg = "Obsolescence vaincue !";
                        newEmoji = "♻️";
                }

                // Afficher le message (disparaît après 2 sec)
                setFeedbackMessage(msg);
                setTimeout(() => setFeedbackMessage(null), 2000);

                setScore(s => s + 1);
                return { ...item, type: 'good', emoji: newEmoji, speed: -3 };
            }
            return item;
        }));
    };

    const startGame = () => {
        // Réinitialiser state et refs pour éviter les effets de bord
        setItems([]);
        itemsRef.current = [];
        frameRef.current = 0;

        setScore(0);
        scoreRef.current = 0;

        setLives(5);
        livesRef.current = 5;

        setFeedbackMessage(null);
        setGameState('playing');
    };

    const goBack = () => {
        navigate('/'); // Retour à l'accueil
    };

    // --- RENDU ---
    return (
        <div className="game-wrapper">

            {/* --- PANNEAU GAUCHE : Messages --- */}
            <div className="left-panel">
                {feedbackMessage && (
                    <div className="feedback-popup">
                        {feedbackMessage}
                    </div>
                )}
                {!feedbackMessage && gameState === 'playing' && (
                    <p style={{opacity: 0.5, fontStyle: 'italic'}}>En attente d'action...</p>
                )}
            </div>

            {/* --- PANNEAU CENTRAL : Jeu --- */}
            <div className="game-area">
                {/* Bouton Retour */}
                <button className="back-button" onClick={goBack}>⬅ Retour</button>

                {/* HUD */}
                <div className="hud">
                    {/* Correction du BUG ici : Math.max(0, ...) empêche le négatif */}
                    <div style={{marginLeft: '60px'}}>Vies: {'❤️'.repeat(Math.max(0, lives))}</div>
                    <div style={{marginRight: '20px'}}>Score: {score} / {WIN_SCORE}</div>
                </div>

                <div className="village-zone">
                    🏫 Village NIRD 🏫
                </div>

                {items.map(item => (
                    <GameItem key={item.id} item={item} onClick={handleItemClick} />
                ))}

                {/* Overlays */}
                {gameState === 'start' && (
                    <div className="overlay">
                        <h1>Défense du Village</h1>
                        <p>Clique sur les menaces pour les recycler !</p>
                        <button onClick={startGame}>JOUER</button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="overlay">
                        <h1 style={{color: '#e74c3c'}}>ÉCHEC CRITIQUE</h1>
                        <p>L'obsolescence a gagné...</p>
                        <button onClick={startGame}>RÉESSAYER</button>
                    </div>
                )}

                {gameState === 'victory' && (
                    <div className="overlay">
                        <h1 style={{color: '#2ecc71'}}>VICTOIRE !</h1>
                        <p>Votre parc informatique est sauvé !</p>
                        <button onClick={startGame}>REJOUER</button>
                    </div>
                )}
            </div>

            {/* --- PANNEAU DROITE : Légende --- */}
            <div className="right-panel">
                <div className="legend-box">
                    <div className="legend-title">Menaces</div>
                    <div className="legend-item"><span className="legend-emoji">👾</span> Bug</div>
                    <div className="legend-item"><span className="legend-emoji">💾</span> Vieux PC</div>
                    <div className="legend-item"><span className="legend-emoji">💰</span> Coût €€€</div>
                    <div className="legend-item"><span className="legend-emoji">🕸️</span> Obsolescence</div>

                    <div className="legend-title" style={{marginTop: '20px', color: '#2ecc71', borderBottomColor: '#2ecc71'}}>Solutions</div>
                    <div className="legend-item"><span className="legend-emoji">🐧</span> Linux</div>
                    <div className="legend-item"><span className="legend-emoji">♻️</span> Recyclage</div>
                    <div className="legend-item"><span className="legend-emoji">🛠️</span> Réparation</div>
                </div>
            </div>

        </div>
    );
};

export default Game;