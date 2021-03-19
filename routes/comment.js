const mongoose = require('mongoose')
const Joi = require('joi');
const express = require('express');
const router = express.Router()



const Comment = mongoose.model('Comment', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true
    },
    comment: {
        type: String,
        maxlength: 200,
        minlength: 20,
        required: true
    }
}));


router.get('/', async (req, res) => {
    const comment = await Comment.find()
    res.send(comment)
})

router.get('/:id', (req, res) => {
    const comment = Comment.findById(req.params.id);

    if(!comment) res.status(404).send('The item with the given ID was not found.');

    res.send(comment)
})

router.post('/', async (req, res) => {
    const {error} = validateBook(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let comment = new Comment({ 
        name: req.body.name,
        comment: req.body.comment
    });
    comment = await comment.save()

    res.send(comment)
})

router.delete('/:id', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id)
    if(!comment) return res.status(404).send('The Item with the given ID was not found.')

    res.send(comment)
})

function validateBook (comment) {
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        comment: Joi.string().min(20).max(200).required(),
    }

    return Joi.validate(comment, schema)
}

module.exports = router;