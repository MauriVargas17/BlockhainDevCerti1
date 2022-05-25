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

    function setWallets(address _wallet, uint balance) public {
        myAddresses[_wallet] = balance;
    }

    function receiveMoney() public payable{
        myAddresses[msg.sender] += msg.value;
    }

    function withdrawMoney(uint _amount) public {
        myAddresses[msg.sender] -= _amount * (10**18);
        address payable myWallet = payable (msg.sender);
        myWallet.transfer(_amount * (10**18));
    }

}
