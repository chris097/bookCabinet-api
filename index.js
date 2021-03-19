const mongoose = require('mongoose')
const express = require('express');
const book = require('./routes/book')
const comment = require('./routes/comment')
const app = express()

mongoose.connect('mongodb+srv://okeyhacker:okeyhacker@lib-shelter.z5ex1.mongodb.net/okeyhacker?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use('/api/books', book)
app.use('/api/comment', comment)
require('./prod')(app)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening tp port ${port}`))