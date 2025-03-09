const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    // Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (isValid(username)) {
            users.push({ username: username, password: password });
            return res.status(200).json({ message: "User registered" });
        } else {
            return res.status(400).json({ message: "Username already exists" });
        }
    } else {
        return res.status(400).json({ message: "Username or password is not provided" });
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const book = books[req.params.isbn];
    return res.status(200).json(book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    let book = {};
    for (isbn in books) {
        if (books[isbn].author == req.params.author) {
            book = books[isbn];
            break;
        }
    }
    return res.status(200).json(book);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    let book = {};
    for (isbn in books) {
        if (books[isbn].title == req.params.title) {
            book = books[isbn];
            break;
        }
    }
    return res.status(200).json(book);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const book = books[req.params.isbn];
    return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
