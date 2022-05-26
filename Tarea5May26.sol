// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PauseDestroy{

    address private owner;
    bool public isPaused;

    constructor(){
        owner = msg.sender;
    }

    function setIsPaused(bool flag) public {
        isPaused = flag;
    }

    function depositMoney() public payable {

    }

    function withdrawAllMoney(address payable wallet) public {
        require(msg.sender == owner, "Only owner is authorised");
        require(!isPaused, "Contract is paused");
        wallet.transfer(address(this).balance);
    }

    function destroyContract(address payable contrct) public {
        selfdestruct(contrct);
    }


    
}
