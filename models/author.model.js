const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: true
    },
    nationality: String,
    birthDate: {
        type: Date,
        required: 'Birth date is required'
    },
    avatarUrl: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Antu_system-switch-user.svg'
    }
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;