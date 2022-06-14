import React, {Component, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {connectWallet, initialize} from "./ethereum/web3";
import lotteryContract from "./ethereum/abis/Lottery.json"

function App() {

    const [contract, setContract] = useState<any>('');
    // console.log(contract);
    // setContract('new value');
    /*
        Variables to handle the smart contract
    */
    const [manager, setManager] = useState<any>('');
    const [players, setPlayers] = useState<any>({});
    const [balance, setBalance] = useState<any>('');

    const [value, setValue] = useState<any>(0);

    const [message, setMessage] = useState<any>('');

    useEffect(() => {
        // @ts-ignore
        if(window.web3){
            initialize();
            loadBlockchainData();
        }
    }, [])

    const loadBlockchainData = async () => {
        // @ts-ignore
        const Web3 = window.web3;

        const networkData = lotteryContract.networks['5777'];
        console.log('networkData: ', networkData);

        if(networkData){
            const abi = lotteryContract.abi;
            const address = networkData.address;
            console.log('address: ', address);
            const deployedContract = await new Web3.eth.Contract(abi, address);


            const players = await deployedContract.methods.getPlayers().call();
            await setPlayers(players);

            console.log('players: ', players, players.length);

            const manager = await deployedContract.methods.owner().call();
            await setManager(manager);

            const balance = await Web3.eth.getBalance(deployedContract.options.address);
            await setBalance(balance);

            await setContract(deployedContract);


        }
    }

    const loadBalance = async () => {
        // @ts-ignore
        const Web3 = window.web3;
        const balance = await Web3.eth.getBalance(contract.options.address);
        await setBalance(balance);
    }

    const loadPlayers = async () => {
        const players = await contract.methods.getPlayers().call();
        await setPlayers(players);
    }

    const onPickWinner = async () => {
        //@ts-ignore
        const Web3 = window.web3;
        const accounts = await Web3.eth.getAccounts();

        setMessage(
            "Waiting for transaction confirmation"
        )

        await contract.methods.pickWinner().send({
            from: accounts[0],
        })

        setMessage(
            "We have a winner!"
        )


        loadPlayers();
        loadBalance();


    }

    const onRegistration = async () => {
        //@ts-ignore
        const Web3 = window.web3;

        const accounts = await Web3.eth.getAccounts();

        setMessage(
            "Waiting for transaction confirmation"
        )

        await contract.methods.registerPlayer().send({
            from: accounts[0],
            value: Web3.utils.toWei(value, "ether")
        })

        setMessage(
            "Request successful. You have been registered"
        )
        loadPlayers();
        loadBalance();
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

          <button onClick = {() => onPickWinner()}>Pick Winner!</button>

          <p>Players: {players.length}</p>
          <p>Balance: {balance}</p>
          <p>Owner: {manager}</p>

          <p>Minimum amount to participate: 2.1 ETH</p>
          <input type = 'text' value = {value} onChange = {(event) => {setValue(event.target.value)}}/>
          <button onClick={() => {onRegistration()}}>Register NOW</button>

          <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
