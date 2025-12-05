import React from 'react'
import './header.css'
import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";

const Header = () => {
    return (
        <>
            <div>
                <div id="logo">
                    <Logo />
                </div>
                <div id="menu">
                    <Menu />
                </div>
            </div >
        </>
    )
}

export default Header