// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ModifierExample {
    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public myMapping;
    mapping(address => uint) public myAddresses;

    function setValue(uint _index, bool _value) public {
        myMapping[_index] = _value;
    }

    function setMyAddresses(address _wallet, uint balance) public {
        myAddresses[_wallet] = balance * (10**18);
    }

    function receiveMoney() public payable{
        myAddresses[msg.sender] += msg.value;
    }

    function withdrawMoney(uint _amount) public {
        
        uint amountToEther = _amount * (10**18);

        require(amountToEther <= myAddresses[msg.sender], "Insufficient funds");
        myAddresses[msg.sender] -= amountToEther;
        payable(msg.sender).transfer(amountToEther);

        /*
        if (amountToEther <= myAddresses[msg.sender]){
            myAddresses[msg.sender] -= amountToEther;
            address myWallet = msg.sender;
            payable (myWallet).transfer(amountToEther);
        }
        */
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

}
