const Book = require('../models/book.model');

module.exports.list = (req, res, next) => {
    Book.find()
        .then(books => {
            res.render('books/index', { 
                books
            });
        })
        .catch(error => {
            next(error);
        });
}

module.exports.create = (req, res, next) => {
    res.render('books/create');
}

module.exports.doCreate = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating
    });
    book.save()
        .then(() => {
            res.redirect('/books');
        })
        .catch(error => {
            next(error);
        });
}