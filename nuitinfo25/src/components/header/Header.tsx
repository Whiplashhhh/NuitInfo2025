import React from 'react'
import '../../ressources/css/header.css'
import Menu from "./Menu";
import Logo from "./Logo";

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