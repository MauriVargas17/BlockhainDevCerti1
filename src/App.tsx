import React, {Component, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from "./ethereum/web3";
import lotteryContract from "./ethereum/abis/Lottery.json"

function App() {

    useEffect(() => {
        // @ts-ignore
        if(window.web3){
            initialize();
        }
    }, [])

    const loadBlockchainData = async () => {
     //   const deployedContract;
        // @ts-ignore
        const Web3 = window.web3;

        const networkData = lotteryContract.networks['5777'];
        console.log('networkData: ', networkData);

        if(networkData){
            const abi = lotteryContract.abi;
            const address = networkData.address;
            console.log('address: ', address);
            const deployedContract = new Web3.eth.Contract(abi, address);

            const players = await deployedContract.methods.getPlayers().call();

            console.log('players: ', players, players.length);


        }
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

          <p>Hi React, Truffle and Firebase</p>
          <button onClick = {() => connectWallet()}>Connect</button>
          <button onClick = {() => loadBlockchainData()}>Load Blockchain</button>
      </header>
    </div>
  );
}

export default App;
