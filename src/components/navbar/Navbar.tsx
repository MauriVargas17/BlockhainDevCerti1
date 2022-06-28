import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/PetoLogo.svg';
import './navbar.css';

// BEM -> Block Element Modifier

const Menu = () => (
    <>
        <p><a href="#home">Inicio</a></p>
        <p><a href="#wpeto">¿Que es un Peto?</a></p>
        <p><a href="#possibility">Comprar Petos</a></p>
        <p><a href="#features">Artículos</a></p>
        <p><a href="#blog">Información</a></p>
    </>

)

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="peto__navbar">
            <div className="peto__navbar-links">
                <div className="peto__navbar-links_logo">
                    <img src={logo} />
                </div>
                <div className="peto__navbar-links_container">
                    <Menu/>
                </div>
            </div>
            <div className="peto__navbar-sign">
                <p>Ingresar</p>
                <button type="button">Registrarse</button>
            </div>
            <div className="peto__navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <div className="peto__navbar-menu_container scale-up-center">
                        <div className="peto__navbar-menu_container-links">
                            <Menu/>
                        </div>
                        <div className="peto__navbar-menu_container-links-sign">
                            <p>Sign in</p>
                            <button type="button">Sign up</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;