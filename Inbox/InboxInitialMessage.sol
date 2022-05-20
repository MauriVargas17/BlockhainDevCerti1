// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.8.0;

contract InboxInitialMessage{

    string public mess;

    constructor(string memory initialMessage){
        mess = initialMessage;

    }

    function getMessage() public view returns(string memory) {
        return mess;
    }

    function setMessage(string memory newMessage) public {
        mess = newMessage; 
    }

}