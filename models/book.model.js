const mongoose = require('mongoose');
const DEFAULT_AUTHOR = 'Anonymous';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    author: {
        type: String,
        default: DEFAULT_AUTHOR
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
