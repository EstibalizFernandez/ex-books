const mongoose = require('mongoose');
const Book = require('../models/book.model');
const books = require('../data/books.data');

require('../configs/db.config');

Book.insertMany(books)
    .then(books => {
        console.error(`Seeded ${books.length} books properly`);
        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Seeding error:', error);
        mongoose.connection.close();
    });
