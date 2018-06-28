const mongoose = require('mongoose');
const Author = require('../models/author.model');
const Book = require('../models/book.model');
const authors = require('../data/authors.data');
let books = require('../data/books.data');

require('../configs/db.config');

Author.insertMany(authors)
    .then(authors => {
        console.error(`Seeded ${authors.length} authors properly`);
        books = books.map(book => {
            book.author = authors.find(author => author.name === book.author)._id;
            return book;
        });
        return Book.insertMany(books);
    })
    .then(books => {
        console.error(`Seeded ${books.length} books properly`);
        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Seeding error:', error);
        mongoose.connection.close();
    });
