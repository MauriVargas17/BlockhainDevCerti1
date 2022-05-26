// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructureTest{

    struct Book{
        string title;
        string author;
        uint id;
        bool available;
    }

    Book public book1;
    Book public book2 = Book("example", "me", 123, true);

    function setTitle() public {
        book1.title = "my Title";

    }

    function getTitle() view public returns(string memory){
        return book1.title;
    }
    
    function getTitleAndId() view public returns (string memory, uint){
        return (book2.title, book2.id);
    }
}
