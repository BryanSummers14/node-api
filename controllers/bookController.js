'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Book = require('../models/BookModel');

const allBooks = function(req, res){
    Book.find(function(err, _books) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(_books);
        }
    });
}

const newBook = function(req, res) {
    const _book = new Book(req.body);
    _book.save(function(err, book) {
    if (err) {
        res.status(500).send(err);
    } else {
        res.status(201).send({ bookId: book._id });
    }
    });
}

module.exports = {
    allBooks,
    newBook
}