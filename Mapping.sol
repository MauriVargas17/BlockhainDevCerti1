// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ModifierExample {
    bool public myBoolean;
    string public myString;
    uint public myNumber;

    mapping(uint => bool) public mapita;
    mapping(address => uint) public wallets;

    function setMapita(uint _index, bool _value) public {
        mapita[_index] = _value;
    }

    function setWallets(address _wallet, uint balance) public {
        wallets[_wallet] = balance;
    }
