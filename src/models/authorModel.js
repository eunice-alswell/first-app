const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    authorname: {type: String, minlength: 8,maxlength: 20},
    booktitle: {type: String, minlength: 4},
    pagenumber: {type: Number},
    bookISBN: {type: String},
    booklikes: {type: Number}

});

const Author = mongoose.model('author',authorSchema);

module.exports = Author