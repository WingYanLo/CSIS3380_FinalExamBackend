const express = require('express');
const router = express.Router();
const BookModel = require('../models/book.model');

// GET: Retrieve all books
router.get('/', (req, res) => {
    BookModel.find()
        .then((books) => res.json(books))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// POST: Create a new book
router.post('/', (req, res) => {
    const newBook = new BookModel({
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookDescription: req.body.bookDescription
    });

    newBook.save()
        .then((book) => res.json({ message: 'New book added', book }))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// GET: Retrieve a book by ID
router.get('/:id', (req, res) => {
    BookModel.findById(req.params.id)
        .then((book) => {
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: 'Book Not Found' });
            }
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

// PUT: Update a book by ID
router.put('/:id', (req, res) => {
    BookModel.findById(req.params.id)
        .then((book) => {
            if (book) {
                book.bookTitle = req.body.bookTitle;
                book.bookAuthor = req.body.bookAuthor;
                book.bookDescription = req.body.bookDescription;

                book.save()
                    .then(() => res.json('Book updated!'))
                    .catch((err) => res.status(400).json('Error: ' + err));
            } else {
                res.status(404).json('Book Not Found');
            }
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

// DELETE: Delete a book by ID
router.delete('/:id', (req, res) => {
    BookModel.findByIdAndDelete(req.params.id)
        .then((book) => {
            if (book) {
                res.json({ message: 'Book deleted', book });
            } else {
                res.status(404).json('Book Not Found');
            }
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
