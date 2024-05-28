const axios = require('axios');
const jwt = require('jsonwebtoken');
let UserDB = require('../model/model')
const Books = require('../model/bookModel');
let router = require('../routes/router')




exports.homeRoutes = async (req, res) => {
    const token = req.session.token;
  
    let user; // Define user here.
    let books
    try {
      if (token) {
        const decodedToken = jwt.verify(token, 'benny');
  
        if (decodedToken && decodedToken.userId) {
          user = await UserDB.findById(decodedToken.userId);
        }
      }
      books = await Books.find();
      console.log("dib books", books);
      
      // Always render the "include/_library" page with the user variable, even if it's undefined.
      res.render('index', { user, books });
  
    } catch (error) {
      return res.render('include/_error-page');

    }

};


exports.aboutRoutes = async(req,res)=>{

    const token = req.session.token;
  
    let user; // Define user here.
  
    try {
      if (token) { 
        const decodedToken = jwt.verify(token, 'benny');
  
        if (decodedToken && decodedToken.userId) {
          user = await UserDB.findById(decodedToken.userId);
        }
      }
  
      // Always render the "include/_library" page with the user variable, even if it's undefined.
      res.render('include/_about-page', { user });
  
    } catch (error) {
      return res.render('include/_error-page');

    }
 
}

exports.loginRoutes = (req, res) => {
  const errorMessage = req.session.errorMessage; // Get the error message from the session
  res.render('include/_login', { errorMessage });
};



exports.registerRoutes = (req,res)=>{
  
    res.render('include/_register', { errorMessage: 'Library card is already in use' });
}

exports.libraryRoutes = async (req, res) => {
    // Get the token from the session
    const token = req.query.token;
    res.render('include/_about-page',{token})
};



  
exports.fPasswordRoutes = async (req, res) => {
  // Get the token from the session
  const token = req.query.token;
  res.render('include/_Forgot-p',{token})
};


exports.userProfile = async (req,res)=>{
    const token = req.session.token;
  
    let user; // Define user here.
  
    try {
      if (token) {
        const decodedToken = jwt.verify(token, 'benny');
  
        if (decodedToken && decodedToken.userId) {
          user = await UserDB.findById(decodedToken.userId).lean().exec();;
        }
      }
      const requestedBooksDetails = [];
      if (user && user.RequestedBooks && user.RequestedBooks.length > 0) {
        for (const bookId of user.RequestedBooks) {
          const book = await Books.findById(bookId).lean().exec(); // Fetch book details based on bookId
          if (book) {
            requestedBooksDetails.push(book); // Store book details
          }
        }
      }

      const likedBooksDetails = [];
      if (user && user.LikedBooks && user.LikedBooks.length > 0) {
        for (const bookId of user.LikedBooks) {
          const book = await Books.findById(bookId).lean().exec(); // Fetch book details based on bookId
          if (book) {
            likedBooksDetails.push(book); // Store book details
          }
        }
      }
      const borrowedBooksDetails = [];
      if (user.BorrowedBooks && user.BorrowedBooks.length > 0) {
        for (const bookId of user.BorrowedBooks) {
          const book = await Books.findById(bookId).lean().exec();
          if (book) {
            borrowedBooksDetails.push(book);
          }
        }
      }
    
      console.log(requestedBooksDetails,likedBooksDetails,borrowedBooksDetails)
      const userAgent = req.headers['user-agent'];
       const isMobile = /Mobile/.test(userAgent); 

       const isDesktop = !isMobile;

      // Always render the "include/_library" page with the user variable, even if it's undefined.
      res.render('include/_user-prof', { user, token, requestedBooksDetails, likedBooksDetails,borrowedBooksDetails , isDesktop  });
  
    } catch (error) {
      return res.render('include/_error-page');

    }
}


exports.editProfile = async (req, res) => {
  const user = req.session.user; // Retrieve user data from the session
  const errorMessage = req.session.errorMessage;
  try {
    // Check if user data exists in the session
    if (user) {
      // Render the "include/_edit-profile" page with the user variable
      res.render('include/_edit-profile', { user,errorMessage  });
      req.session.errorMessage = null;
    } else {
      // If user data is not found in the session, handle it appropriately
      return res.render('include/_error-page');

    }
  } catch (error) {
    return res.render('include/_error-page');

  }
}

exports.editBook = async (req, res) => {
  try {
    const bookId = req.params.bookId; // Retrieve book ID from the request parameters

    // Fetch the book details based on the provided book ID
    const book = await Books.findById(bookId).lean().exec();

    if (!book) {
      // If the book with the provided ID is not found, handle it appropriately
      return res.status(404).json({ message: 'Book not found' });
    }

    // Render the "edit-book" page with the book details
    res.render('include/_changeBook', { book });
  } catch (error) {
    return res.render('include/_error-page');

  }
};


exports.DeleteUser = async (req, res) => {
  const user = req.session.user; // Retrieve user data from the session
  const errorMessage = req.session.errorMessage;
  try {
    // Check if user data exists in the session
    if (user) {
      // Render the "include/_edit-profile" page with the user variable
      res.render('include/_delete', { user,errorMessage  });
      req.session.errorMessage = null;
    } else {
      // If user data is not found in the session, handle it appropriately
      return res.render('include/_error-page');

    }
  } catch (error) {
    return res.render('include/_error-page');

  }
}






