// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

contract Inbox{

    string public message;
    address private ownerAddress;

    constructor(string memory initialMessage){
        message = initialMessage;
        ownerAddress = msg.sender;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public onlyOwner(msg.sender){
        // require(msg.sender == ownerAddress, "Only the owner can modify the message");
        message = newMessage;
    }


    modifier onlyOwner(address client){
        require(ownerAddress == client, "Only the owner can change the message");
        _;
    }

}