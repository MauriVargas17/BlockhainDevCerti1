// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StructureTest{

    struct Book{
        string title;
        string author;
        uint id;
        bool available;
        uint quantity;
    }


    Book public book1;
    Book public book2 = Book("example", "me", 123, true,1);

    mapping(uint => Book) public libraryBook;

    function getBook(uint idBook) view public returns(bool){
        return libraryBook[idBook].available;
    }

    function borrowBook(uint idBook) public{
        libraryBook[idBook].quantity--;
    }

    function addBook(Book memory newBook) public {
        // To add a "newBook" we insert: , ["title", "author", id, true/false, 1]
        libraryBook[newBook.id] = newBook;
    }

    function setTitle() public {
        book1.title = "my Title";

    }

    function getTitle(Book memory book) view public returns(string memory){
        return book.title;
    }
    
    function getTitleAndId(Book memory book) view public returns (string memory, uint){
        return (book.title, book.id);
    }
}
