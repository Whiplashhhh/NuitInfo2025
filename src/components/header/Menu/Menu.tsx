import React from 'react';
import './menu.css';

interface MenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

interface MenuItem {
    label: string;
    href: string;
}

const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
    const menuItems: MenuItem[] = [
        { label: 'Accueil', href: '#accueil' },
        { label: 'La Démarche', href: '#demarche' },
        { label: 'Agir', href: '#agir' },
        { label: 'Ressources', href: '#ressources' },
        { label: 'Communauté', href: '#communaute' }
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
                            <a href={item.href} onClick={toggleMenu}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Menu;
