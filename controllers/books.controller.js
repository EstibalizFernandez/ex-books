const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

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

module.exports.get = (req, res, next) => {
    const id = req.params.id;
    Book.findById(id)
        .then(book => {
            if (book) {
                res.render('books/detail', {
                    book
                });
            } else {
                next(createError(404, `Book with id ${id} not found`));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Book with id ${id} not found`));
            } else {
                next(error);
            }
        });
}

module.exports.create = (req, res, next) => {
    res.render('books/create');
}

module.exports.doCreate = (req, res, next) => {

    function renderWithErrors(errors) {
        res.render('books/create', {
            book: req.body,
            errors: errors
        });
    }

    Author.findOne({ name: req.body.author })
        .then(author => {
            if (author) {
                console.log(author);
                const book = new Book({
                    title: req.body.title,
                    author: author._id,
                    description: req.body.description,
                    rating: req.body.rating
                });
                return book.save()
                    .then(() => {
                        res.redirect('/books');
                    });
            } else {
                renderWithErrors({ author: 'Invalid author name' })
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors);
            } else {
                next(error);
            }
        });
}

module.exports.update = (req, res, next) => {
    const id = req.params.id;
    Book.findById(id)
        .then(book => {
            if (book) {
                res.render('books/update', {
                    book
                });
            } else {
                next(createError(404, `Book with id ${id} not found`));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Book with id ${id} not found`));
            } else {
                next(error);
            }
        });
}

module.exports.doUpdate = (req, res, next) => {
    const id = req.params.id;
    Book.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true, new: true })
        .then(book => {
            if (book) {
                res.redirect(`/books/${id}`);
            } else {
                next(createError(404, `Book with id ${id} not found`));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Book with id ${id} not found`));
            } else if (error instanceof mongoose.Error.ValidationError) {
                req.body._id = id;
                res.render('books/update', {
                    book: req.body,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        });
}