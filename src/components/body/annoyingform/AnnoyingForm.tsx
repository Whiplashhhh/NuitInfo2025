import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnnoyingForm.css';

const AnnoyingForm: React.FC = () => {
    const navigate = useNavigate();
    
    // Date de naissance - chaque chiffre séparément
    const [day1, setDay1] = useState(0); // Premier chiffre du jour (0-3)
    const [day2, setDay2] = useState(1); // Deuxième chiffre du jour (0-9)
    const [month1, setMonth1] = useState(0); // Premier chiffre du mois (0-1)
    const [month2, setMonth2] = useState(1); // Deuxième chiffre du mois (0-9)
    const [year, setYear] = useState<number[]>([1, 9, 9, 0]); // 4 chiffres de l'année
    
    // États pour les mécanismes frustrants
    const [sliderDirection, setSliderDirection] = useState(1); // Change aléatoirement
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [captchaValidated, setCaptchaValidated] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [clickCount, setClickCount] = useState(0);
    const [mouseTrail, setMouseTrail] = useState<{x: number, y: number}[]>([]);
    
    // Références
    const formRef = useRef<HTMLDivElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    // Effet pour changer la direction du slider aléatoirement
    useEffect(() => {
        const interval = setInterval(() => {
            setSliderDirection(Math.random() > 0.5 ? 1 : -1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Effet pour la rotation continue du formulaire (légère)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSpinning) {
                setRotationAngle(prev => (prev + (Math.random() - 0.5) * 2) % 360);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isSpinning]);

    // Gestion du trail de souris qui cache les éléments
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = formRef.current?.getBoundingClientRect();
        if (rect) {
            setMouseTrail(prev => [...prev.slice(-20), { 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top 
            }]);
        }
    };

    // Slider inversé qui change de sens
    const handleSliderChange = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        value: number,
        max: number
    ) => {
        const actualValue = sliderDirection === 1 ? value : max - value;
        setter(Math.max(0, Math.min(max, actualValue)));
    };

    // Année avec molette de souris inversée
    const handleYearScroll = (index: number, delta: number) => {
        setYear(prev => {
            const newYear = [...prev];
            // Inversé : scroll up = diminue, scroll down = augmente
            newYear[index] = (newYear[index] - Math.sign(delta) + 10) % 10;
            return newYear;
        });
    };

    // Bouton qui fuit la souris
    const handleButtonMouseEnter = () => {
        if (!captchaValidated) {
            const newX = (Math.random() - 0.5) * 300;
            const newY = (Math.random() - 0.5) * 100;
            setButtonPosition({ x: newX, y: newY });
            setClickCount(prev => prev + 1);
            
            if (clickCount > 5 && clickCount < 10) {
                setErrorMessage("🎯 Tu dois d'abord valider le CAPTCHA rotatif !");
            } else if (clickCount >= 10) {
                setErrorMessage("😈 Le bouton a peur de toi... Valide le CAPTCHA d'abord !");
            }
        }
    };

    // CAPTCHA rotatif - doit aligner le texte
    const handleCaptchaClick = () => {
        setIsSpinning(true);
        const spinDuration = 1000 + Math.random() * 2000;
        const finalRotation = rotationAngle + 720 + Math.random() * 360;
        
        let start: number | null = null;
        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / spinDuration;
            
            if (progress < 1) {
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setRotationAngle(rotationAngle + (finalRotation - rotationAngle) * easeOut);
                requestAnimationFrame(animate);
            } else {
                setRotationAngle(finalRotation % 360);
                setIsSpinning(false);
                
                // Validation si proche de 0° (tolérance de 15°)
                const normalizedAngle = finalRotation % 360;
                if (normalizedAngle < 15 || normalizedAngle > 345) {
                    setCaptchaValidated(true);
                    setErrorMessage(null);
                    setButtonPosition({ x: 0, y: 0 });
                }
            }
        };
        requestAnimationFrame(animate);
    };

    // Soumission du formulaire
    const handleSubmit = () => {
        if (!captchaValidated) {
            setErrorMessage("🔄 Veuillez d'abord valider le CAPTCHA rotatif !");
            return;
        }

        const day = day1 * 10 + day2;
        const month = month1 * 10 + month2;
        const yearNum = year[0] * 1000 + year[1] * 100 + year[2] * 10 + year[3];

        // Validation basique de la date
        if (day < 1 || day > 31) {
            setErrorMessage("📅 Jour invalide ! (01-31)");
            return;
        }
        if (month < 1 || month > 12) {
            setErrorMessage("📅 Mois invalide ! (01-12)");
            return;
        }
        if (yearNum < 1900 || yearNum > 2024) {
            setErrorMessage("📅 Année invalide ! (1900-2024)");
            return;
        }

        setShowSuccess(true);
        setErrorMessage(null);
    };

    const getFormattedDate = () => {
        return `${day1}${day2}/${month1}${month2}/${year.join('')}`;
    };

    return (
        <div className="annoying-form-container" onMouseMove={handleMouseMove}>
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Retour (Fuyez tant que vous le pouvez)
            </button>

            <div 
                className="annoying-form-wrapper"
                ref={formRef}
                style={{ transform: `rotate(${rotationAngle * 0.1}deg)` }}
            >
                <h1 className="annoying-title">
                    📝 Formulaire de Date de Naissance
                    <span className="subtitle">( Bonne chance... )</span>
                </h1>

                <p className="instructions">
                    Entrez votre date de naissance au format JJ/MM/AAAA
                    <br />
                    <small>⚠️ Attention : Les contrôles peuvent avoir un comportement... inattendu</small>
                </p>

                <div className="date-preview">
                    Date actuelle : <span className="date-value">{getFormattedDate()}</span>
                </div>

                {/* Section JOUR */}
                <div className="input-section">
                    <h3>📆 JOUR <span className="hint">(Sliders inversés aléatoirement)</span></h3>
                    <div className="slider-group">
                        <div className="slider-container">
                            <label>Premier chiffre (0-3)</label>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                value={sliderDirection === 1 ? day1 : 3 - day1}
                                onChange={(e) => handleSliderChange(setDay1, parseInt(e.target.value), 3)}
                                className={`weird-slider ${sliderDirection === -1 ? 'inverted' : ''}`}
                            />
                            <span className="slider-value">{day1}</span>
                            <span className="direction-indicator">
                                {sliderDirection === 1 ? '→' : '←'} Direction actuelle
                            </span>
                        </div>
                        <div className="slider-container">
                            <label>Deuxième chiffre (0-9)</label>
                            <input
                                type="range"
                                min="0"
                                max="9"
                                value={sliderDirection === 1 ? day2 : 9 - day2}
                                onChange={(e) => handleSliderChange(setDay2, parseInt(e.target.value), 9)}
                                className={`weird-slider ${sliderDirection === -1 ? 'inverted' : ''}`}
                            />
                            <span className="slider-value">{day2}</span>
                        </div>
                    </div>
                </div>

                {/* Section MOIS */}
                <div className="input-section">
                    <h3>📅 MOIS <span className="hint">(Cliquez 10 fois pour changer d'1)</span></h3>
                    <div className="click-counter-group">
                        <div className="click-box">
                            <label>Premier chiffre (0-1)</label>
                            <div className="multi-click-container">
                                <button 
                                    className="multi-click-btn"
                                    onClick={() => {
                                        setClickCount(prev => {
                                            if ((prev + 1) % 10 === 0) {
                                                setMonth1(m => (m + 1) % 2);
                                            }
                                            return prev + 1;
                                        });
                                    }}
                                >
                                    Cliquer ({clickCount % 10}/10)
                                </button>
                                <span className="click-value">{month1}</span>
                            </div>
                        </div>
                        <div className="click-box">
                            <label>Deuxième chiffre (0-9)</label>
                            <div className="multi-click-container">
                                <button 
                                    className="multi-click-btn"
                                    onClick={() => setMonth2(m => (m + 1) % 10)}
                                >
                                    +1 (mais parfois +2 😈)
                                </button>
                                <span className="click-value">{month2}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section ANNÉE */}
                <div className="input-section">
                    <h3>📆 ANNÉE <span className="hint">(Molette inversée sur chaque chiffre)</span></h3>
                    <div className="year-wheels">
                        {year.map((digit, index) => (
                            <div 
                                key={index}
                                className="year-digit-container"
                                onWheel={(e) => {
                                    e.preventDefault();
                                    handleYearScroll(index, e.deltaY);
                                }}
                            >
                                <div className="digit-display">
                                    <span className="digit-preview">{(digit + 1) % 10}</span>
                                    <span className="digit-current">{digit}</span>
                                    <span className="digit-preview">{(digit - 1 + 10) % 10}</span>
                                </div>
                                <small>Scroll ici</small>
                            </div>
                        ))}
                    </div>
                    <p className="year-hint">⚠️ Scroll haut = diminue, Scroll bas = augmente (oui, c'est inversé)</p>
                </div>

                {/* CAPTCHA Rotatif */}
                <div className="captcha-section">
                    <h3>🔄 CAPTCHA Rotatif</h3>
                    <p>Cliquez pour faire tourner. Arrêtez quand le texte est droit !</p>
                    <div 
                        className={`captcha-wheel ${captchaValidated ? 'validated' : ''}`}
                        onClick={handleCaptchaClick}
                        style={{ transform: `rotate(${rotationAngle}deg)` }}
                    >
                        {captchaValidated ? '✅ VALIDÉ' : '🔐 CAPTCHA'}
                    </div>
                    {captchaValidated && (
                        <p className="captcha-success">✨ Bravo ! Le CAPTCHA est validé !</p>
                    )}
                </div>

                {/* Message d'erreur */}
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                {/* Bouton de soumission qui fuit */}
                <div className="submit-section">
                    <button
                        ref={submitBtnRef}
                        className={`submit-btn ${captchaValidated ? 'catchable' : 'fleeing'}`}
                        style={{
                            transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`
                        }}
                        onMouseEnter={handleButtonMouseEnter}
                        onClick={handleSubmit}
                    >
                        {captchaValidated ? '🎉 Soumettre !' : '😈 Attrape-moi si tu peux !'}
                    </button>
                </div>

                {/* Trail de souris décoratif */}
                {mouseTrail.map((pos, i) => (
                    <div
                        key={i}
                        className="mouse-trail"
                        style={{
                            left: pos.x,
                            top: pos.y,
                            opacity: i / mouseTrail.length,
                            transform: `scale(${0.5 + (i / mouseTrail.length) * 0.5})`
                        }}
                    />
                ))}
            </div>

            {/* Modal de succès */}
            {showSuccess && (
                <div className="success-modal">
                    <div className="success-content">
                        <h2>🎊 FÉLICITATIONS ! 🎊</h2>
                        <p>Vous avez réussi à entrer votre date de naissance :</p>
                        <p className="final-date">{getFormattedDate()}</p>
                        <p>Temps estimé perdu : ∞ minutes</p>
                        <p>Niveau de frustration atteint : 💢💢💢💢💢</p>
                        <button onClick={() => navigate('/')}>
                            Retourner à la santé mentale →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnoyingForm;
