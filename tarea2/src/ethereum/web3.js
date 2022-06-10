import Web3 from "web3";

const isMetamaskInstalled = () => {
    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

export const initialize = () => {
    if(isMetamaskInstalled()){
        alert("Metamask is installed!");
        window.web3 = new Web3(window.ethereum);
    } else {
        alert("Metamask is not installed...");
    }
}

export const connectWallet = async () => {
    try{
        await window.ethereum.request({method: "eth_requestAccounts"});
        alert("Wallet was successfully connected");
    } catch (e) {
        if(e.code === 4001){
            alert("Connecting error...");
        } else {
            alert(e.message);
        }
    }

}