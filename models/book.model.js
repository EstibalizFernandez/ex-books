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
        min: 1,
        max: 10
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
