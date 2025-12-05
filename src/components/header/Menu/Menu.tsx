import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

interface MenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

interface MenuItem {
    label: string;
    href: string;
    isRoute?: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
    const menuItems: MenuItem[] = [
        { label: 'Défi Retro', href: '/retro', isRoute: true },
        { label: 'Défi Sopra', href: '/annoying-form', isRoute: true },
    ];

    return (
        <>
            <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.isRoute ? (
                                <Link to={item.href} onClick={toggleMenu}>
                                    {item.label}
                                </Link>
                            ) : (
                                <a href={item.href} onClick={toggleMenu}>
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Menu;
