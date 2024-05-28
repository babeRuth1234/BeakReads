const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment')
const schema = new mongoose.Schema({
    libraryCard: {
        type:String, 
        required: true,
        unique:true
    },
    FirstName: {
        type:String,
        required: true,
    },
    LastName:{
        type:String,
        required: true,
    },
    Email:{
        type:String,
        required: true,
        unique:true
    },
    ProfilePic: {
        type: String,
      },
    PassWord: {
        type:String,
        required: true,
        unique:true
    },
    Gender: {
        type: String,
        required: false,
        default:"None"
        
    },
    PaidUser: {
        type: Boolean,
        default: false,
        required: false
    },
    BorrowedBooks: {type: Array},
    LikedBooks:{type: Array},
    RequestedBooks: {type: Array},
    Returns: {type: Array},
    Year:{type: Date, default: Date.now},
    VerifyCode: {
        type:Number,
        required:false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    OriginalFilename: {
        type: String, // Store the original filename of the uploaded image
        required: false,
    },
})

schema.pre('save', function (next) {
    const randomLibraryCard = Math.floor(1000 + Math.random() * 9000);
    this.libraryCard = randomLibraryCard.toString();

    // Add debug statements
    console.log('Middleware - Generated libraryCard:', this.libraryCard);
    console.log('Middleware - User Data Before Save:', this);

    next();
});

const UserDB = mongoose.model('userDatabase',schema);

module.exports = UserDB;