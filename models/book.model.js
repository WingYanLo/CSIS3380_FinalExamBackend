const { Schema, model } = require('mongoose');

// Define the schema for books
const bookSchema = new Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    bookDescription: { type: String }
}, { versionKey: false });

// Create the model with the custom collection name
const BookModel = model('Book', bookSchema, '300387440-wingyan'); // Custom collection name

module.exports = BookModel;
