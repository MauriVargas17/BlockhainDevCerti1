// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Bank{

    address public owner;

    struct Account{
        uint id;
        string name;
        uint saldo;
        bool isEnabled;
        address wallet;
    }

    constructor(){
        owner = msg.sender;
    }

    mapping(uint => Account) public accounts;

    function ethToWei(uint eth) private pure returns(uint){
        return eth * 10**9;
    }

    function addAccount(uint id, string memory name, address wallet) public ownerPermission returns (Account memory) {
        require(bytes(name).length > 5, "Name is too short, it should be at least 6 characters long");
        Account memory account = Account(id, name, 0, true, wallet);
        accounts[account.id] = account;
        return account;
    }

    function deposit(uint accountID) public payable accountEnabled(accountID){
        uint amount = msg.value;
        require(amount > 2 * 10**18, "Amount to deposit must be higher than 2 ETH");
        if(amount > 10 * 10**18){
            accounts[accountID].saldo += amount + 10**18;
        }else {
            accounts[accountID].saldo += amount;
        }
        emit depositEvent(accountID, accounts[accountID].name, amount);
    }

    event depositEvent(uint id, string name, uint amountDeposited);
    event withdrawEvent(uint id, string name, uint amountWithdrawn);

    function withdraw(uint accountID) public payable accountEnabled(accountID){
        uint amount = msg.value;
        Account memory acc = accounts[accountID];
        require(amount < acc.saldo, "Amount to withdraw should be less than the account balance");
        acc.saldo -= amount * 10**18;
        emit withdrawEvent(accountID, acc.name, amount);
        payable(acc.wallet).transfer(amount);

    }

    function withdrawAllMoney() public payable ownerPermission{
        (bool os,)= payable(owner).call{value:address(this).balance}("");
        require(os);
    }

    function getSaldo(uint accountID) public view returns(uint){
        return accounts[accountID].saldo;
    }

    function getName(uint accountID) public view returns(string memory){
        return accounts[accountID].name;
    }

    function blockAccount(uint accountID) public ownerPermission{
        accounts[accountID].isEnabled = false;
    }

    function closeBank(address payable contrct) public ownerPermission{
        selfdestruct(contrct);
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    modifier accountEnabled(uint id){
        require(accounts[id].isEnabled, "Account should be enabled to complete this operation");
        _;
    }

    modifier ownerPermission{
        require(msg.sender == owner, "Only owner is authorised");
        _;
    }

}
