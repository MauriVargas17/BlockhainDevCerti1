// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Library{

    address public owner;
    uint private balance;
    uint slot = 0;

    struct Book{
        string title;
        string author;
        bool isAvailable;
        uint borrowingPrice;
        uint index;
    }

    constructor(){
        owner = msg.sender;
    }

    mapping(uint => Book) public libraryBooks;

    function addBook(string memory title, string memory author) public returns (Book memory){
        Book memory book = Book(title, author, true, 20 ether, slot);
        libraryBooks[slot++] = book;
        return book;
    }

    function withdrawAllMoney() public payable ownerPermission{
        (bool os,)= payable(owner).call{value:address(this).balance}("");
        require(os);
    }

    function getBalance()public view ownerPermission returns(uint){
        return address(this).balance;
    }

    function destroyLibrary(address payable contrct) public ownerPermission{
        selfdestruct(contrct);
    }

    function borrowBook(uint id)public payable{
        require(libraryBooks[id].isAvailable, "Book is not available");
        require(msg.value >= 10, "The amount is insufficient, should be 10 eth");
        libraryBooks[id].isAvailable = false;
    }

    function returnBook(uint id)public payable{
        payable(msg.sender).transfer(10 ether);
        libraryBooks[id].isAvailable = true;
    }

    modifier ownerPermission{
        require(msg.sender == owner, "Only owner is authorised");
        _;
    }

}
