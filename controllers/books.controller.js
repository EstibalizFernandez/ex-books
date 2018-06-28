const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

module.exports.list = (req, res, next) => {
    Book.find()
        .populate('author')
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
        .populate('author')
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

    const authorName = req.body.author;
    Author.findOne({ name: authorName })
        .then(author => {
            if (author) {
                const bookData = Object.assign({}, req.body);
                book.author = author._id;
                const book = new Book(bookData);
                return book.save()
                    .then(() => {
                        res.redirect('/books');
                    });
            } else {
                req.body.author = {
                    name: authorName
                };
                renderWithErrors({ author: 'Invalid author name' })
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                req.body.author = {
                    name: authorName
                };
                renderWithErrors(error.errors);
            } else {
                next(error);
            }
        });
}

module.exports.update = (req, res, next) => {
    const id = req.params.id;
    Book.findById(id)
        .populate('author')
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

    function renderWithErrors(errors) {
        res.render('books/update', {
            book: req.body,
            errors: errors
        });
    }

    const id = req.params.id;
    const authorName = req.body.author;
    Author.findOne({ name: authorName})
        .then(author => {
            if (author) {
                const bookData = Object.assign({}, req.body);
                bookData.author = author._id;
                return Book.findByIdAndUpdate(id, { $set: bookData }, { runValidators: true, new: true })
                    .then(book => {
                        if (book) {
                            res.redirect(`/books/${id}`);
                        } else {
                            next(createError(404, `Book with id ${id} not found`));
                        }
                    })
            } else {
                req.body._id = id;
                req.body.author = {
                    name: authorName
                };
                renderWithErrors({ author: 'Invalid author name' })
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Book with id ${id} not found`));
            } else if (error instanceof mongoose.Error.ValidationError) {
                req.body._id = id;
                req.body.author = {
                    name: authorName
                };
                renderWithErrors(error.errors)
            } else {
                next(error);
            }
        });
}