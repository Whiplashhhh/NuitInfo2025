import React from 'react'
import '../../ressources/css/header.css'
import Menu from "./Menu";

const Header = () => {
    return (
        <>
            <div>
                <h1>Revive</h1>
            </div>
            <div id="menu">
                <Menu />
            </div>
        </>
    )
}

export default Header