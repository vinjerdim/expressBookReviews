const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    for (user of users) {
        if (user.username == username) {
            return false;
        }
    }
    return true;
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    for (user of users) {
        if (user.username == username && user.password == password) {
            return true;
        }
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    // Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT access token
    let accessToken = jwt.sign({
        data: { username: username }
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).json({ message: "User successfully logged in" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let book = books[req.params.isbn];
    book.reviews[req.user.username] = req.query.review;
    return res.status(200).json(req.user);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
