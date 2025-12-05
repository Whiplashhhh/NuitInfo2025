import React from 'react';
import './header.css';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import Slogan from "./Slogan/Slogan";

const Header = () => {
    return (
        <>
        <header className="header">
            <div className="header-logo">
                <Logo />
            </div>
            <nav className="header-menu">
                <Menu />
            </nav>
        </header>
        <div className="header-slogan">
            <Slogan />
        </div>
        </>
    );
}

export default Header;
