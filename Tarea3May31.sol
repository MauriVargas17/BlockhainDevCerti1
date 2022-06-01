// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EventTest{

    address ownerAddress;
    mapping(address => uint) public tokenBalance;

    event tokensSent(address walletFrom, uint amount, address walletTo);

    constructor(){
        tokenBalance[msg.sender] = 100;
        ownerAddress = msg.sender;
    }

    function sendToken(address receiver, uint amount) public returns(bool){
        require(msg.sender == ownerAddress, "Owner only");
        tokenBalance[msg.sender] -= amount;
        tokenBalance[receiver] += amount;

        emit tokensSent(msg.sender, amount, receiver);

        return true;
    }
}
