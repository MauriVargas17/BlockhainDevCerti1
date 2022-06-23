// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Lottery{

    address[] public players;
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function registerPlayer() public payable {
        require(msg.value > 2 ether, "The minimum amount to participate is 2 ether");
        players.push(msg.sender);
    }

    function getRandomNumber() public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    event showWinner(address winner, uint amountWon);

    function pickWinner() public onlyOwner {
        uint index =  getRandomNumber() % players.length;
        emit showWinner(players[index], address(this).balance);
        payable (players[index]).transfer(address(this).balance);
        players = new address[](0);

    }

    modifier onlyOwner{
        require(msg.sender == owner, "Only owner can execute this function");
        _;
    }

    function getPlayers() public view returns (address[] memory){
        return players;
    }


}