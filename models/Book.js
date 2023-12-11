const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    year: {
        type: Number
    }
})

const Book = mongoose.model('book', bookSchema)

module.exports = Book