import React, { useState, useEffect } from 'react';
import './header.css';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import Slogan from './Slogan/Slogan';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header-wrapper">
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <Logo />
                    <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                </div>
            </header>
            <Slogan />
        </div>
    );
};

export default Header;
