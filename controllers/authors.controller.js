const createError = require('http-errors');
const mongoose = require('mongoose');
const Author = require('../models/author.model');

module.exports.list = (req, res, next) => {
    Author.find()
        .then(authors => {
            res.render('authors/index', { 
                authors
            });
        })
        .catch(error => {
            next(error);
        });
}

module.exports.create = (req, res, next) => {
    res.render('authors/create');
}

module.exports.doCreate = (req, res, next) => {
    const author = new Author(req.body);
    author.save()
        .then(() => {
            res.redirect('/authors');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('authors/create', { 
                    author: author,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        });
}
