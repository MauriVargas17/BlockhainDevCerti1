import React from 'react';
import './App.css';

import { Footer, Blog, Possibility, Features, WhatPetoCoin, Header } from './containers';
import { CTA, Brand, Navbar } from './components';

function App() {
  return (
      <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <Brand />
        <WhatPetoCoin />
        <Features />
        <Possibility />
        <CTA />
          <CTA />
        <Blog />
        <Footer />
      </div>
  );
}

export default App;
