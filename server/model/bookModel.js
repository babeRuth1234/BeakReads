const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment')
const Bookschema = new mongoose.Schema({
    Source:{
        type: String,
        required: true
    },
    Author:{
        type: String,
        required: true
    },
    Year:{
        type: Date,
    },
    PublicationTitle:{
        type: String,
        // required: true
    },
    ResourceType:{
        type: String,
        required: true
    },
    About:{
        type: String,
        required: true
    },
 
    NumberOfCopies:{
        type: Number,
        required: true
    },
    BookCover:{
        type: String,
    },
    Aisle :{
        type:Number,
    },
    Row:{
        type:Number,
    },
    Shelf:{
        type:Number,
    },
    Ratings:{
        type: Number,
    }
});

const Books = mongoose.model('BookData',Bookschema);

module.exports = Books;