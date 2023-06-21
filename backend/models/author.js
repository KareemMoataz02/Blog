const mongoose = require('mongoose');

const Author = mongoose.model('Author', {
    name: {
        type: String,
    },
    lastname: { 
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    about: {
        type: String,
    },
    
});

module.exports = Author;