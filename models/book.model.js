const mongoose = require('mongoose');
const DEFAULT_AUTHOR = 'Anonymous';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    description: {
        type: String,
        required: 'Description is required',
        minlength: [10, 'Description min length 10 characters']
    },
    author: {
        type: String,
        default: DEFAULT_AUTHOR
    },
    rating: {
        type: Number,
        min: [1, 'Min rating is 1'],
        max: [10, 'Max rating is 10']
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
