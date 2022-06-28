import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/PetoGoldenCoin.png';
import './header.css';

const Header = () => (
    <div className="peto__header section__padding" id="home">
        <div className="peto__header-content">
            <h1 className="gradient__text">Sé parte de la web descentralizada con Peto Coin</h1>
            <p>Descubre el mundo que se está construyendo en la Web 3.0, donde encontrarás soluciones inteligentes para adquirir tokens, NFTs y criptomonedas. Peto Coin es un proyecto que busca darle valor a tus ideas, respaldándonos en la red de Ethereum para garantizar la seguridad de punto a punto.</p>

            <div className="peto__header-content__input">
                <input type="email" placeholder="Tu correo electrónico" />
                <button type="button">Comencemos</button>
            </div>

            <div className="peto__header-content__people">
                <img src={people} />
                <p>¡1,600 personas ya se hicieron parte de la iniciativa!</p>
            </div>
        </div>

        <div className="peto__header-image">
            <img src={ai} />
        </div>
    </div>
);

export default Header;