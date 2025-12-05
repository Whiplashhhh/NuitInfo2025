import React from 'react';
import './header.css';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <Logo />
            </div>
            <nav className="header-menu">
                <Menu />
            </nav>
        </header>
    );
}

export default Header;
