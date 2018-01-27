var express = require('express');

module.exports = function() {
    var bookController = require('../controllers/bookController');
    var bookRouter = express.Router();
    bookRouter.route('/')
        .get(bookController.allBooks)
        .post(bookController.newBook);

    return bookRouter;
}