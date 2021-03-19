const mongoose = require('mongoose')
const Joi = require('joi');
const express = require('express');
const router = express.Router()



const Book = mongoose.model('Book', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    author: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    bookUrl: {
        type: String,
        required: true
    },
    isPublished: {
        type: Number,
        required: true,
        maxlength: 4
    },
    imageUrl: {
        type: String
    },
    description:{
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300
    }
}));


router.get('/', async (req, res) => {
    const book = await Book.find()
    res.send(book)
})

router.get('/:id', (req, res) => {
    const items = Book.findById(req.params.id);

    if(!items) res.status(404).send('The item with the given ID was not found.');

    res.send(items)
})

router.post('/', async (req, res) => {
    const {error} = validateBook(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let items = new Book({ 
        title: req.body.title 
    });
    items = await items.save()

    res.send(items)
})

router.delete('/:id', async (req, res) => {
    const items = await Book.findByIdAndRemove(req.params.id)
    if(!items) return res.status(404).send('The Item with the given ID was not found.')

    res.send(items)
})

function validateBook (book) {
    const schema = {
        title: Joi.string().min(5).max(20).required(),
        author: Joi.string().min(5).max(20).required(),
        bookUrl: Joi.string().required(),
        isPublished: Joi.string().min(4).max(4).required(),
        imageUrl: Joi.string(),
        description: Joi.string().min(20).max(300).required()
    }

    return Joi.validate(book, schema)
}

module.exports = router;
