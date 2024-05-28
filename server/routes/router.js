const express = require('express')
const session = require('express-session');
// const FileStore = require('express-session-file-store')(session); // Use a session store for development
const route = express.Router()
const nodemailer = require('nodemailer');
const services = require('../services/render')
const controller = require('../controller/controller');
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken');
const UserDB = require('../model/model');
const Books = require('../model/bookModel');
const { set } = require('mongoose');
const { token } = require('morgan');
// const isAuthenticated = require('../services/adminTab');
const { generateAccessToken } = require('../routes/token');
const isAdmin = require('../routes/isadmin');
const multer = require('multer');
const {differenceInMinutes, differenceInSeconds, addMinutes } = require('date-fns')
const methodOverride = require('method-override');
// const stripe = require('stripe')('sk_test_51OH503DPlcwfl5rEKbv11O3JzYvn9ppVriJ0q0dpFiPyRPCI4BrJoYSpmERb4Ngk5ddfxS1C28xyQUWoQc9AnMgE00P0dPQJ79'); // Replace with your secret key


const fs =  require('fs')

const stripe = require('stripe')('sk_test_51OH503DPlcwfl5rEKbv11O3JzYvn9ppVriJ0q0dpFiPyRPCI4BrJoYSpmERb4Ngk5ddfxS1C28xyQUWoQc9AnMgE00P0dPQJ79');



route.use(
  session({
    secret: 'kindle19', // Change this to a strong and secure secret
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(), // Use a session store for development
    cookie: {
      maxAge: 3600000, // Session timeout in milliseconds (e.g., 1 hour)
    },
  })
);
// Updated login route
route.use(methodOverride('_method'));

route.get('/', services.homeRoutes)

// route.get('/library', (req, res) => {
//   if (req.session.user) {
//     // User is logged in, retrieve user data from the session
//     const user = req.session.user;

//     // Render the dashboard template and pass the user data to it
//     res.render('include/_library', { user });
//   } else {
//     // User is not logged in, redirect to the login page
//     res.redirect('/login');
//   }
// });

// route.get('/library', async (req, res) => {
//   try {
//     if (req.session.user) {
//       // User is logged in, retrieve user data from the session
//       const user = req.session.user;

//       // Fetch book data from the database
//       const books = await Books.find(); // Adjust this based on your schema and requirements

//       // Render the library template and pass the user data and book data to it
//       res.render('include/_library', { user, books });
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Handle errors, e.g., log the error and send an error response
//     console.error(error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

// route.get('/library', async (req, res) => {
//   try {
//     const searchQuery = req.query.search;
//     console.log('Search Query:', searchQuery);

//     if (req.session.user) {
//       // User is logged in, retrieve user data from the session
//       const user = req.session.user;

//       // Fetch book data from the database based on the search query
//       let books;
//       if (searchQuery) {
//         console.log('Performing search');
//         // Adjust this based on your schema and requirements for searching
//         books = await Books.find({ $text: { $search: searchQuery } });
//       } else {
//         console.log('Fetching all books');
//         books = await Books.find();
//       }

//       console.log('Books found:', books);

//       // Render the library template and pass the user data and book data to it
//       res.render('include/_library', { user, books });
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Handle errors, e.g., log the error and send an error response
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

// Render the library page with book IDs as tokens
// route.get('/library', async (req, res) => {
//   try {
//     const searchQuery = req.query.search;
//     console.log('Search Query:', searchQuery);

//     if (req.session.user) {
//       // User is logged in, retrieve user data from the session
//       const user = req.session.user;

//       // Fetch book data from the database based on the search query
//       let books;
//       if (searchQuery) {
//         console.log('Performing search');
//         // Adjust this based on your schema and requirements for searching
//         books = await Books.find({ $text: { $search: searchQuery } });
//         console.log('Searched Books found:', books);

//         // Render the library template and pass the user data and searched books as tokens
//         res.render('include/_library', { user, books });
//       } else {
//         console.log('Fetching all books');
//         // If no search query, fetch all books
//         books = await Books.find();

//         // Render the library template and pass all books to EJS
//         res.render('include/_library', { user, books });
//       }
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Handle errors, e.g., log the error and send an error response
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   } 
// });

// route.get('/library', async (req, res) => {
//   try {
//     const searchQuery = req.query.search;

//     console.log('Search Query:', searchQuery); // Log the search query

//     if (req.session.user) {
//       const user = req.session.user;

//       let books;
//       let foundBookIds = []; // Array to store IDs of found books

//       if (searchQuery) {
//         books = await Books.find({ $text: { $search: searchQuery } });

//         console.log('Books found with search query:', books); // Log found books

//         // Extract IDs of the found books
//         foundBookIds = books.map(book => book._id);
//         console.log('Found Book IDs:', foundBookIds); // Log found book IDs
//       } else {
//         books = await Books.find();
//       }

//       res.render('include/_library', { user, books, searchQuery, foundBookIds });
//     } else {
//       res.redirect('/login');
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });
// Express route handling the library and search


// Inside your route handling the search
// Inside your route handling the search




// route.get('/library', async (req, res) => {
//   try {
//     const searchQuery = req.query.search || '';
//     const resourceType = req.query.resourceType || '';
//     const publicationDate = req.query.publicationDate || '';

//     // Logging the received search query
//     console.log('Received search query:', searchQuery, resourceType, publicationDate);

//     if (req.session.user) {
//       const user = req.session.user;

//       let books;

//       if (searchQuery) {
//         // Query the database based on the search query
//         books = await Books.find({ $text: { $search: searchQuery } });

//         // Logging the search results
//         console.log('Search results:', books);
//       } else {
//         // Fetch all books if there's no search query
//         books = await Books.find();

//         // Logging that no search query was provided
//         console.log('No search query, fetching all books:', books);
//       }

//       // Render the library template and pass the user data and book data to it
//       res.render('include/_library', { user, books, searchQuery  });
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Logging any errors that occur during the process
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

// route.get('/library', async (req, res) => {
//   try {
//     const searchQuery = req.query.search || '';
//     const resourceType = req.query.resourceType || '';

//     // Logging the received search query
//     console.log('Received search query:', searchQuery);
//     console.log('Received resource type:', resourceType);

//     if (req.session.user) {
//       const user = req.session.user;

//       let books;

//       if (searchQuery || resourceType) {
//         let query = {};

//         if (resourceType) {
//           query.ResourceType = resourceType; // Include ResourceType filter if available
//         }

//         if (searchQuery) {
//           // Perform a broader text search across multiple fields
//           query.$or = [
//             { Author: { $regex: new RegExp(searchQuery, 'i') } },
//             { PublicationTitle: { $regex: new RegExp(searchQuery, 'i') } },
//             { About: { $regex: new RegExp(searchQuery, 'i') } },
//             // Add more fields as needed for searching
//           ];
//         }

//         // Query the database with the constructed query
//         books = await Books.find(query);

//         // Logging the search results
//         console.log('Search results:', books);
//       } else {
//         // Fetch all books if there's no search query or resource type
//         books = await Books.find();

//         // Logging that no search query was provided
//         console.log('No search query, fetching all books:', books);
//       }

//       // Render the library template and pass the user data and book data to it
//       res.render('include/_library', { user, books, searchQuery, resourceType });
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Logging any errors that occur during the process
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });


// route.get('/library', async (req, res) => {
//   try {
//     const searchQuery = req.query.search || '';
//     const resourceType = req.query.resourceType || '';
//     const publicationDate = req.query.publicationDate || '';

//     // Logging the received search query, resource type, and publication date
//     console.log('Received search query:', searchQuery);
//     console.log('Received resource type:', resourceType);
//     console.log('Received publication date:', publicationDate);

//     if (req.session.user) {
//       const user = req.session.user;

//       let books;

//       if (searchQuery || resourceType || publicationDate) {
//         let query = {};

//         if (resourceType) {
//           query.ResourceType = resourceType; // Include ResourceType filter if available
//         }

//         if (searchQuery) {
//           // Perform a broader text search across multiple fields
//           query.$or = [
//             { Author: { $regex: new RegExp(searchQuery, 'i') } },
//             { PublicationTitle: { $regex: new RegExp(searchQuery, 'i') } },
//             { About: { $regex: new RegExp(searchQuery, 'i') } },
//             // Add more fields as needed for searching
//           ];
//         }

//         if (publicationDate) {
//           // Assuming publicationDate is a string in 'YYYY-MM-DD' format
//           query.Year = new Date(publicationDate);
//         }

//         // Query the database with the constructed query
//         books = await Books.find(query);

//         // Logging the search results
//         console.log('Search results:', books);
//       } else {
//         // Fetch all books if there's no search query, resource type, or publication date
//         books = await Books.find();

//         // Logging that no search query was provided
//         console.log('No search query, fetching all books:', books);
//       }

//       // Render the library template and pass the user data and book data to it
//       res.render('include/_library', { user, books, searchQuery, resourceType, publicationDate });
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Logging any errors that occur during the process
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

route.get('/library', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const resourceType = req.query.resourceType || '';
    const publicationDate = req.query.publicationDate || '';
    const bookCha = req.query.bookCha || '';

    // Logging the received search query, resource type, and publication date
    console.log('Received search query:', searchQuery);
    console.log('Received resource type:', resourceType);
    console.log('Received publication date:', publicationDate);
    console.log('Received publication date:', bookCha);

    if (req.session.user) {
      const user = req.session.user;

      let books;

      if (searchQuery || resourceType || publicationDate || bookCha) {
        let query = {};

        if (resourceType) {
          query.ResourceType = resourceType; // Include ResourceType filter if available
        }
        

        if (searchQuery) {
          // Perform a broader text search across multiple fields
          query.$or = [
            { Author: { $regex: new RegExp(searchQuery, 'i') } },
            { PublicationTitle: { $regex: new RegExp(searchQuery, 'i') } },
            { About: { $regex: new RegExp(searchQuery, 'i') } },
            // Add more fields as needed for searching
          ];
        }

        if (publicationDate) {
          // Assuming publicationDate is in 'YYYY-MM' format from the input field type='month'
          const [year, month] = publicationDate.split('-').map(Number);
          const startDate = new Date(year, month - 1); // Month is 0-indexed in JavaScript Date

          // Set the query for the publication year and month
          query.Year = {
            $gte: startDate, // Greater than or equal to the start date of the month
            $lt: new Date(year, month) // Less than the start date of the next month
          };
        }
        
        
        if (bookCha) {
          // Search by Book ID directly
          query._id = bookCha;
        }
        // Query the database with the constructed query
        books = await Books.find(query);

        // Logging the search results
        console.log('Search results:', books);
      } else {
        // Fetch all books if there's no search query, resource type, or publication date
        books = await Books.find();

        // Logging that no search query was provided
        console.log('No search query, fetching all books:', books);
      }

      // Fetch user's liked books from the database
      const userWithLikedBooks = await UserDB.findById(user._id).lean().exec();
      const userWithRequestedBooks = await UserDB.findById(user._id).lean().exec();
      const Borrowed = await UserDB.findById(user._id).lean().exec();
      // console.log('userWithLikedBooks:', userWithLikedBooks);

      const likedBooks = userWithLikedBooks.LikedBooks || []; // Assuming LikedBooks is an array of book IDs
      const RequestedBooks = userWithRequestedBooks.RequestedBooks || []; // Assuming LikedBooks is an array of book IDs
      const borrowed = Borrowed.BorrowedBooks || []; // Assuming LikedBooks is an array of book IDs
      // console.log('likedBooks:', likedBooks); // Log likedBooks

// Render the library template and pass the user data, book data, and liked books to it
res.render('include/_library', { user, books, searchQuery, resourceType, publicationDate, likedBooks, RequestedBooks, borrowed});
    } else {
      // User is not logged in, redirect to the login page
      res.redirect('/login');
    }
  } catch (error) {
    // Logging any errors that occur during the process
    console.error('Error fetching data:', error);
    return res.render('include/_error-page');

  }
});


route.get('/login', services.loginRoutes)
route.get('/about-page',services.aboutRoutes)
route.get('/register', services.registerRoutes)

route.get('/user', services.userProfile)
route.get('/editUser', services.editProfile)
route.get('/edit/:bookId', services.editBook);
route.get('/delete',services.DeleteUser)
route.get('/NewPassword',services.fPasswordRoutes)

// good times with an API 
route.post('/api/users', controller.register);
// route.post('/Newbooks', controller.addBook)
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

route.post('/login', async (req, res) => {
  const { Email, PassWord } = req.body;

  try {
    const user = await UserDB.findOne({ Email });

    if (user && CryptoJs.AES.decrypt(user.PassWord, 'benny').toString(CryptoJs.enc.Utf8) === PassWord) {
      const token = generateAccessToken(user);

      // Store user data in the session, including the token
      req.session.user = user;
      req.session.token = token;

      if (user.isAdmin) {
        // Redirect to the admin panel if the user is an admin
        res.redirect('/adminPanel');
    } else {
        // Redirect to the home page if the user is a regular user
        res.redirect(`/?token=${token}`);
    };
    } else {
      // Invalid credentials
      req.session.errorMessage = 'Invalid Credentials';
      res.redirect('/login')
    }
  } catch (error) {
    // Internal server error
    console.error(error);
    return res.render('include/_error-page');

  }
});


route.post('/update-profile', async (req, res) => {
  const user = req.session.user; // Get the user data from the session

  if (!user) {
    return res.render('include/_error-page');

  }

  const { oldPassword, newPassword, gender, email, firstName, lastName } = req.body; // Get form data

  try {
    // Fetch the user's data from the database using the Mongoose model
    const userModel = await UserDB.findById(user._id);

    if (!userModel) {
      return res.render('include/_error-page');

    }

    // Decrypt the old password from the user's data
    const decryptedOldPassword = CryptoJs.AES.decrypt(userModel.PassWord, 'benny').toString(CryptoJs.enc.Utf8);

    if (decryptedOldPassword === oldPassword) {
      // Update the user's data
      userModel.Gender = gender;
      userModel.Email = email;
      userModel.FirstName = firstName;
      userModel.LastName = lastName;

      // Check if the new password is provided and update it if necessary
      if (newPassword) {
        userModel.PassWord = CryptoJs.AES.encrypt(newPassword, 'benny').toString();
      }

      // Save the updated user data
      await userModel.save();
      
      res.redirect('/user');
    } else {
      // Invalid old password
      req.session.errorMessage = 'Current password is incorrect';
      res.redirect('/editUser');
      
    }
  } catch (error) {
    console.error(error);
    return res.render('include/_error-page');

  }
});



route.get('/logout', (req, res) => {
  // Clear the user's session or authentication token
  req.session.destroy();
  // Redirect to the homepage
  res.redirect('/');
});


route.post('/delete-account', async (req, res) => {
  const authToken = req.session.token; // Assuming you store the user's token in the session

  if (!authToken) {
    return res.render('include/_error-page');

  }

  try {
    // Verify the authentication token and get the user's ID
    const decoded = jwt.verify(authToken, 'benny'); // Use the same secret key as in your login route
    const userId = decoded.userId;

    // Step 3: Delete the user's account using your UserDB model
    await UserDB.findByIdAndRemove(userId);

    // Optionally, you can clear the session or handle user cleanup tasks here.

    console.log('User account deleted successfully'); // Log success message
    return res.redirect('/');
  } catch (error) {
    console.error('Error while deleting account:', error); // Log the error
    return res.render('include/_error-page');
  }
});


// Apply the middleware to the admin panel route
// route.get('/adminPanel', isAdmin, async (req, res) => {
//   // This code is executed only if the user is an admin

//   // Check if the user is authenticated. The isAdmin middleware already checks authentication.
//   if (!req.session.user) {
//       return res.status(403).send('Access denied. You must be authenticated to access this page.');
//   }

//   // Make sure the user object exists
//   if (!req.session.user) {
//       return res.status(500).send('Internal server error. User not found.');
//   }

//   // You can now retrieve data or perform actions specific to the admin panel.

//   // For example, you can fetch a list of all users in the database.
//   try {
//     const books = await Books.find(); // Adjust this based on your schema and requirements
//     const allUsers = await UserDB.find();

//       // Render the admin panel template and pass the list of users as data.
//       res.render('include/_admin-panel', { users: allUsers, books });
     
//   } catch (error) {
//       // Handle any errors that occur during data retrieval or rendering.
//       console.error(error);
//       res.status(500).send('Internal server error');
//   }
// });



// route.get('/adminPanel', isAdmin, async (req, res) => {
//   try {
//     const searchQuery = req.query.search || '';

//     // Logging the received search query
//     console.log('Received search query:', searchQuery);

//     if (req.session.user) {
//       const allUsers = await UserDB.find();
//       let books;
//       let users;
//       if (searchQuery) {
//         // Construct a query to perform a broader text search across multiple fields
//         const query = {
//           $or: [
//             { Author: { $regex: new RegExp(searchQuery, 'i') } },
//             { PublicationTitle: { $regex: new RegExp(searchQuery, 'i') } },
//             { FirstName: { $regex: new RegExp(searchQuery, 'i') } },
//             // Add more fields as needed for searching
//           ],
//         };

//         // Query the database with the constructed query
//         books = await Books.find(query);
//         users = await UserDB.find(query)
//         // Logging the search results
//         console.log('Search results:', books);
//         console.log('users:', users);
//       } else {
//         // Fetch all books if there's no search query
//         books = await Books.find();

//         // Logging that no search query was provided
//         console.log('No search query, fetching all books:', books);
//       }

//       // Render the admin panel template and pass the user and book data to it
//       res.render('include/_admin-panel', { users: allUsers, books, searchQuery });
//     } else {
//       // User is not logged in, redirect to the login page
//       res.redirect('/login');
//     }
//   } catch (error) {
//     // Logging any errors that occur during the process
//     console.error('Error fetching data:', error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

route.post('/request-book/:bookId', async (req, res) => {
  try {
    const userId = req.session.user._id; // Assuming user ID is available in the session
    const bookId = req.params.bookId;

    // Find the user in the database
    const user = await UserDB.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.render('include/_error-page');

    }

    // Check if the user is paid (assuming isPaid is a boolean property)
    console.log('User:', user);
    if (user.PaidUser !== true) {
      console.log('User is not paid');
      return res.redirect('/Subscribe');
    }

    // Find the book in the database
    const book = await Books.findById(bookId);

    if (!book) {
      console.log('Book not found');
      return res.render('include/_error-page');

    }

    // Add the book to the user's RequestedBooks array
    user.RequestedBooks.push(book);

    // Save the updated user data
    await user.save();

    res.redirect('/library')
  } catch (error) {
    console.error('Error requesting book:', error);
    return res.render('include/_error-page');

  }
});

route.post('/Cancel-book/:bookId', async (req, res) => {
  try {
    const userId = req.session.user._id;
    const bookIdToRemove = req.params.bookId;

    // Find the user and the book to remove from LikedBooks
    const user = await UserDB.findById(userId);
    const indexToRemove = user.RequestedBooks.findIndex(book => book._id.toString() === bookIdToRemove);

    // If the book exists in LikedBooks, remove it by index
    if (indexToRemove !== -1) {
      user.RequestedBooks.splice(indexToRemove, 1);
      await user.save(); // Save the updated user data

      console.log('Book removed successfully:', bookIdToRemove);
    } else {
      console.log('Book not found in LikedBooks:', bookIdToRemove);
    }

    res.redirect('/library');
  } catch (error) {
    console.error('Error removing book from LikedBooks:', error);
    return res.render('include/_error-page');

  }
});

route.post('/like-book/:bookId', async (req, res) => {
  try {
    const userId = req.session.user._id; // Assuming user ID is available in the session
    const bookId = req.params.bookId;

    // Find the user and the book in the database
    const user = await UserDB.findById(userId);
    const book = await Books.findById(bookId);

    if (!user || !book) {
      return res.render('include/_error-page');
    }

    // Add the book to the user's BorrowedBooks array
    user.LikedBooks.push(book);

    // Save the updated user data
    await user.save();

    res.redirect('/user');
  } catch (error) {
    console.error('Error requesting book:', error);
    return res.render('include/_error-page');

  }
});

route.post('/unlike-book/:bookId', async (req, res) => {
  try {
    const userId = req.session.user._id;
    const bookIdToRemove = req.params.bookId;

    // Find the user and the book to remove from LikedBooks
    const user = await UserDB.findById(userId);
    const indexToRemove = user.LikedBooks.findIndex(book => book._id.toString() === bookIdToRemove);

    // If the book exists in LikedBooks, remove it by index
    if (indexToRemove !== -1) {
      user.LikedBooks.splice(indexToRemove, 1);
      await user.save(); // Save the updated user data

      console.log('Book removed successfully:', bookIdToRemove);
    } else {
      console.log('Book not found in LikedBooks:', bookIdToRemove);
    }

    res.redirect('/user');
  } catch (error) {
    console.error('Error removing book from LikedBooks:', error);
    return res.render('include/_error-page');
  }
});



route.get('/adminPanel', isAdmin, async (req, res) => {
  try {
    const searchQuery = req.query.search || '';

    // Logging the received search query
    console.log('Received search query:', searchQuery);

    if (req.session.user) {
      const allUsers = await UserDB.find();
      let books;
      let users;
      if (searchQuery) {
        // Construct a query to perform a broader text search across multiple fields
        const query = {
          $or: [
            { Author: { $regex: new RegExp(searchQuery, 'i') } },
            { Source: { $regex: new RegExp(searchQuery, 'i') } },
            { About: { $regex: new RegExp(searchQuery, 'i') } },
            { ResourceType: { $regex: new RegExp(searchQuery, 'i') } },
            { PublicationTitle: { $regex: new RegExp(searchQuery, 'i') } },
            { FirstName: { $regex: new RegExp(searchQuery, 'i') } },
            { Gender: { $regex: new RegExp(searchQuery, 'i') } },
            { Email: { $regex: new RegExp(searchQuery, 'i') } },
            { libraryCard: { $regex: new RegExp(searchQuery, 'i') } },

            // Add more fields as needed for book searching
          ],
        };

        // Query the database with the constructed query for books
        books = await Books.find(query);
        // Fetch users based on the same search query
        users = await UserDB.find(query);
        
        // Logging the search results
        console.log('Search results - books:', books);
        console.log('Search results - users:', users);
      } else {
        // Fetch all books if there's no search query
        books = await Books.find();

        // Logging that no search query was provided
        console.log('No search query, fetching all books:', books);
      }

      // Render the admin panel template and pass the user and book data to it
      res.render('include/_admin-panel', { users: users,usersq: allUsers ,books, searchQuery });
    } else {
      // User is not logged in, redirect to the login page
      res.redirect('/login');
    }
  } catch (error) {
    // Logging any errors that occur during the process
    console.error('Error fetching data:', error);
    return res.render('include/_error-page');
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets'); // Set your U directory to the parent folder "assets"
  },
  filename: function (req, file, cb) {
    // Use a unique identifier and the original file name
    const uniqueFilename = Date.now() + '-' + file.originalname;
    const relativePath = 'UserImages/' + uniqueFilename; // Construct the relative path within "assets/UserImages"

    cb(null, relativePath);
  },
});

const upload = multer({ storage: storage });

route.post('/upload', upload.single('userImage'), async (req, res) => {
  console.log('Handling POST /upload route...');

  const authToken = req.session.token; // Assuming you store the user's token in the session

  if (!authToken) {
    console.log('User not authenticated');
    return res.render('include/_error-page');
  }

  try {
    // Verify the authentication token and get the user's ID
    const decoded = jwt.verify(authToken, 'benny'); // Use the same secret key as in your login route
    const userId = decoded.userId;

    if (!userId) {
      console.log('User ID not found in the token');
      return res.render('include/_error-page');
    }

    console.log('User ID:', userId);

    if (req.file) {
      try {
        // Update the ProfilePic with the unique identifier and original file name
        const updatedUser = await UserDB.findByIdAndUpdate(
          userId,
          { ProfilePic: req.file.filename, OriginalFilename: req.file.originalname },
          { new: true } // This option returns the updated document
        );

        if (updatedUser) {
          console.log('User updated:', updatedUser);
          return res.redirect('/user');
        } else {
          console.log('User not found');
          return res.render('include/_error-page');

        }
      } catch (err) {
        console.error('Image upload failed:', err);
        return res.render('include/_error-page');

      }
    } else {
      console.log('No file uploaded');
      return res.render('include/_error-page');

    }
  } catch (error) {
    console.error('Error while verifying token:', error); // Log the error
    return res.render('include/_error-page');

  }
});



route.post('/uploadd', upload.single('userImage1'), async (req, res) => {
  console.log('Handling POST /upload route...');

  const authToken = req.session.token; // Assuming you store the user's token in the session

  if (!authToken) {
    console.log('User not authenticated');
    return res.render('include/_error-page');
  }

  try {
    // Verify the authentication token and get the user's ID
    const decoded = jwt.verify(authToken, 'benny'); // Use the same secret key as in your login route
    const userId = decoded.userId;

    if (!userId) {
      console.log('User ID not found in the token');
      return res.render('include/_error-page');
    }

    console.log('User ID:', userId);

    if (req.file) {
      try {
        // Update the ProfilePic with the unique identifier and original file name
        const updatedUser = await UserDB.findByIdAndUpdate(
          userId,
          { ProfilePic: req.file.filename, OriginalFilename: req.file.originalname },
          { new: true } // This option returns the updated document
        );

        if (updatedUser) {
          console.log('User updated:', updatedUser);
          return res.redirect('/user');
        } else {
          console.log('User not found');
          return res.render('include/_error-page');

        }
      } catch (err) {
        console.error('Image upload failed:', err);
        return res.render('include/_error-page');

      }
    } else {
      console.log('No file uploaded');
      return res.render('include/_error-page');

    }
  } catch (error) {
    console.error('Error while verifying token:', error); // Log the error
    return res.render('include/_error-page');

  }
});

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets'); // Set your upload directory to the parent folder "assets"
  },
  filename: function (req, file, cb) {
    // Use a unique identifier and the original file name
    const uniqueFilename = Date.now() + '-' + file.originalname;
    const relativePath = 'bookCover/' + uniqueFilename; // Construct the relative path within "assets/UserImages"

    cb(null, relativePath);
  },
});

const Upload = multer({ storage: Storage });


// route.post('/Newbooks', Upload.single('BookCover'), async (req, res) => {
//   // Validate other form fields
//   if (!req.body.Source || !req.body.Author || !req.body.Year || !req.body.PublicationTitle || !req.body.ResourceType || !req.body.About || !req.body.ShelfLocation || !req.body.NumberOfCopies || !req.body.BookCover) {
//     return res.status(400).send({ message: "All fields are required!" });
//   }

//   try {
//     const book = new Books({
//       // Source: req.body.Source,
//       Author: req.body.Author,
//       Source: req.body.Source,
//       Year: req.body.Year, // Assuming Year is a Date
//       PublicationTitle: req.body.PublicationTitle,
//       ResourceType: req.body.ResourceType,
//       About: req.body.About,
//       ShelfLocation: req.body.ShelfLocation,
//       NumberOfCopies: req.body.NumberOfCopies,
//       BookCover: req.file ? req.file.filename : '', // Store the filename in the database
//     });

//     const data = await book.save();
//     res.redirect('/library');
//   } catch (err) {
//     res.status(500).send({
//       message: err.message || "An error occurred in the create operation",
//     });
//   }
// });

route.post('/Newbooks', Upload.single('BookCover'), async (req, res) => {
  try {
    // Validate other form fields
    if (
      !req.body.Source ||
      !req.body.Author ||
      !req.body.Year ||
      !req.body.PublicationTitle ||
      !req.body.ResourceType ||
      !req.body.About ||

      !req.body.Aisle ||
      !req.body.Row ||
      !req.body.Shelf ||
      !req.file // Check if the file is present
    ) {
      console.log('Form data is incomplete');
      return res.render('include/_error-page');
    }

    // Rest of your processing logic
    const book = new Books({
      Author: req.body.Author,
      Source: req.body.Source,
      Year: req.body.Year, // Assuming Year is a Date
      PublicationTitle: req.body.PublicationTitle,
      ResourceType: req.body.ResourceType,
      About: req.body.About,
      ShelfLocation: req.body.ShelfLocation,
      NumberOfCopies: req.body.NumberOfCopies,
      Shelf: req.body.Shelf,
      Row: req.body.Row,
      Aisle: req.body.Aisle,
      BookCover: req.file.filename, // Store the filename in the database
    });

    const data = await book.save();
    console.log('Book saved successfully:', data);
    
    res.redirect('/library');
  } catch (err) {
    console.error('Error occurred during book save:', err);
    res.status(500).send({
      message: err.message || "An error occurred in the create operation",
    });
  }
});




// Your route handler
route.get('/view-cover/:id', async (req, res) => {
  try {
    // Use req.params.id instead of req.params.bookId
    const book = await Books.findById(req.params.id);
    
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    // Render a page with the book cover image
    res.render('include/_coverImg', { book });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Send a more detailed error response
    return res.render('include/_error-page');

  }
});

route.get('/Locate/:id', async (req, res) => {
  try {
    // Use req.params.id instead of req.params.bookId
    const book = await Books.findById(req.params.id);
    
    if (!book) {
      return res.redirect('include/_error-page');;
    }

    // Render a page with the book cover image
    res.render('include/_bookLocation', { book });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Send a more detailed error response
    return res.render('include/_error-page');

  }
});

const stripePublicKey = 'pk_test_51OH503DPlcwfl5rEsz2a1rFQHacrMr3ePAURGsXKrvP32eWPO1ivXq5gqxmA8G6MJ9OJcChF25wQbcsiD4yjNPtc00N9dwMCiy';



route.get('/Subscribe', async (req, res) => {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      try {
        if (req.session.user) {
          const user = req.session.user;
    
          // Render the library template and pass the user data, book data, and liked books to it
          res.render('include/_subscribe', { user, stripePublicKey: stripePublicKey, items: JSON.parse(data), }); // Moved 'items' inside the same object as 'user'
        } else {
          // User is not logged in, redirect to the login page
          res.redirect('/login');
        }
      } catch (error) {
        // Logging any errors that occur during the process
        console.error('Error fetching data:', error);
        return res.render('include/_error-page');

      }
    }
  });
});


route.get('/pay-with-stripe', async (req, res) => {
  try {
    const userId = req.session.user._id;

    console.log('User ID:', userId);

    const user = await UserDB.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.render('include/_error-page');

    }

    console.log('User found:', user);

    user.PaidUser = true;

    console.log('PaidUser property set to true');

    await user.save();

    console.log('User data saved successfully:'+ user);

    // Log the user object after saving changes
    console.log('User after save:', user);

    res.redirect('https://buy.stripe.com/test_fZedT12KWemO8kUaEF');
  } catch (error) {
    console.error('Error updating PaidUser property or initiating Stripe payment:', error);
    return res.render('include/_error-page');

  }
});

// Assuming your route looks something like this:
route.get('/user-details', async (req, res) => {
  const userId = req.query.id; // Extract user ID from the query parameter

  try {
    // Fetch user details from the database using the user ID, along with the BorrowedBooks
    const user = await UserDB.findById(userId).populate('BorrowedBooks');

    if (!user) {
      return res.status(404).send('User not found');
    }
    const requestedBooksDetails = user.RequestedBooks;
    const BorrowedBooksDetails = user.BorrowedBooks;
    // Render a page displaying the user details and borrowed books
    res.render('include/UsersHub', { user,requestedBooksDetails,BorrowedBooksDetails }); // Pass the retrieved user data (including BorrowedBooks) to the template
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.render('include/_error-page');

  }
});

// Assuming you have a User model and using Mongoose


// Your route to handle successful payment events from Stripe

// Endpoint to handle Stripe webhook events
// route.post('/payment-success', async (req, res) => {
//   const payload = req.body;
//   const sig = req.headers['stripe-signature'];

//   try {
//     const event = stripe.webhooks.constructEvent(payload, sig, 'your_webhook_secret');

//     // Handle specific event types
//     if (event.type === 'payment_intent.succeeded') {
//       const paymentIntent = event.data.object;
//       const customerId = paymentIntent.customer; // Retrieve customer ID from paymentIntent

//       // Assuming you have a way to link your user with the customer in your database
//       // Update user's "PaidUser" property to true
//       // You'll need to implement this logic to find and update the user
//       // const user = await findUserAndUpdate(customerId);

//       // Respond with a success status
//       res.json({ received: true });
//     }
//   } catch (err) {
//     console.error('Error handling webhook:', err);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// });



// Route to handle issuing a book

// Declare a global object to store timers for each book
// Declare a global object to store timers for each book
// const bookTimers = {};

// route.post('/issue-book/:userId/:bookId', async (req, res) => {
//   const userId = req.params.userId;
//   const bookId = req.params.bookId;

//   try {
//     console.log('User ID:', userId);
//     console.log('Book ID:', bookId);

//     const user = await UserDB.findById(userId);

//     if (!user) {
//       console.log('User not found');
//       return res.status(404).send('User not found');
//     }

//     const bookToMove = user.RequestedBooks.find(book => String(book._id) === bookId);

//     if (!bookToMove) {
//       console.log('Book not found in requested books');
//       return res.status(404).send('Book not found in requested books');
//     }

//     user.RequestedBooks = user.RequestedBooks.filter(book => String(book._id) !== bookId);
//     user.BorrowedBooks.push(bookToMove);

//     // Store the borrowing timestamp for the book
//     bookToMove.borrowedTimestamp = Date.now();

//     await user.save();

//     console.log('Book issued successfully');

//     // Start a timer for the book
//     const timerId = setTimeout(() => {
//       const borrowedBook = user.BorrowedBooks.find(book => String(book._id) === bookId);
//       const currentTime = Date.now();
//       const borrowingTime = borrowedBook.borrowedTimestamp || 0;
//       const oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds

//       const timeRemaining = borrowingTime + oneMinute - currentTime;
//       const minutesRemaining = Math.floor(timeRemaining / (60 * 1000));

//       console.log(`Time remaining for the book: ${minutesRemaining} minutes`);

//       // Clean up the timer reference for the specific book
//       delete bookTimers[bookId];
//     }, 1 * 60 * 1000); // Timer set for 1 minute in milliseconds

//     // Store the timer reference in the global bookTimers object
//     bookTimers[bookId] = timerId;

//     res.status(200).send('Book issued successfully');
//   } catch (error) {
//     console.error('Error issuing book:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

const borrowingPeriod = 3 * 60 * 1000; // 3 minutes in milliseconds // 7 days in milliseconds
const bookTimers = {};

async function canBorrowAnotherBook(user) {
  const currentTime = Date.now();

  for (const book of user.BorrowedBooks) {
    const borrowingTime = book.borrowedTimestamp || 0;
    const timeElapsed = currentTime - borrowingTime;

    if (timeElapsed < 0 || timeElapsed > borrowingPeriod) {
      return false;
    }
  }

  return true;
}

route.post('/issue-book/:userId/:bookId', async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    const user = await UserDB.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }

    if (!canBorrowAnotherBook(user)) {
      console.log('User has an expired book; cannot borrow another');
      return res.status(400).send('Cannot borrow another book due to an expired book');
    }

    console.log('User ID:', userId);
    console.log('Book ID:', bookId);

    const bookToMove = user.RequestedBooks.find(book => String(book._id) === bookId);

    if (!bookToMove) {
      console.log('Book not found in requested books');
      return res.status(404).send('Book not found in requested books');
    }

    user.RequestedBooks = user.RequestedBooks.filter(book => String(book._id) !== bookId);
    user.BorrowedBooks.push(bookToMove);

    bookToMove.borrowedTimestamp = Date.now();

    await user.save();

    console.log('Book issued successfully');

    const timerId = setTimeout(() => {
      const borrowedBook = user.BorrowedBooks.find(book => String(book._id) === bookId);
      const currentTime = Date.now();
      const borrowingTime = borrowedBook.borrowedTimestamp || 0;
      const oneMinute = 1 * 60 * 1000;

      const timeRemaining = borrowingTime + oneMinute - currentTime;
      const minutesRemaining = Math.floor(timeRemaining / (60 * 1000));

      console.log(`Time remaining for the book: ${minutesRemaining} minutes`);

      delete bookTimers[bookId];
    }, 1 * 60 * 1000);

    bookTimers[bookId] = timerId;

    res.redirect('include/UsersHub')
  } catch (error) {
    console.error('Error issuing book:', error);
    return res.render('include/_error-page');

  }
});


// DELETE route to delete a book by its ID
route.post('/delete-book/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);

    if (!deletedBook) {
      console.log(`Book with ID ${bookId} not found`);
      return res.status(404).send('Book not found');
    }

    console.log(`Book with ID ${bookId} deleted successfully`);
    res.redirect('include/_admin-panel')
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.render('include/_error-page');

  }
});

// Define the update book route



// Define the update book route
route.post('/update-book/:bookId', Upload.single('BookCover'), async (req, res) => {
  const { bookId } = req.params; // Retrieve book ID from the request parameters

  try {
    // Validate other form fields
    if (
      !req.body.Source ||
      !req.body.Author ||
      !req.body.Year ||
      !req.body.PublicationTitle ||
      !req.body.ResourceType ||
      !req.body.About ||
      !req.body.Aisle ||
      !req.body.Row ||
      !req.body.Shelf
    ) {
      console.log('Form data is incomplete');
      return res.status(400).send({ message: 'All fields are required!' });
    }

    // Fetch the book data from the database using the provided bookId
    const book = await Books.findById(bookId);

    if (!book) {
      console.log('Book not found');
      return res.status(404).json({ message: 'Book not found' });
    }

    // Log the received data for debugging purposes
    console.log('Received data:', req.body);

    // Update individual fields based on received values from the request body
    book.Source = req.body.Source;
    book.Author = req.body.Author;
    book.Year = req.body.Year;
    book.PublicationTitle = req.body.PublicationTitle;
    book.ResourceType = req.body.ResourceType;
    book.About = req.body.About;
    book.NumberOfCopies = req.body.NumberOfCopies;
    book.Shelf = req.body.Shelf;
    book.Row = req.body.Row;
    book.Aisle = req.body.Aisle;

    // Check if a file is uploaded and update BookCover only if there's a new file
    if (req.file) {
      book.BookCover = req.file.filename; // Store the filename in the database
    }

    // Save the updated book data
    await book.save();

    console.log('Book updated successfully:', book);
    res.redirect('/library'); // Redirect to a suitable location after book update
  } catch (error) {
    console.error(error);
    return res.render('include/_error-page');
  }
});


route.post('/return-book/:userId/:bookId', async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    console.log('Attempting to return book...');
    console.log('User ID:', userId);
    console.log('Book ID:', bookId);

    const user = await UserDB.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.render('include/_error-page');

    }

    const bookToReturn = user.BorrowedBooks.find(book => String(book._id) === bookId);

    if (!bookToReturn) {
      console.log('Book not found in borrowed books');
      return res.render('include/_error-page');

    }

    // Remove the book from BorrowedBooks and update ReturnedBooks
    user.BorrowedBooks = user.BorrowedBooks.filter(book => String(book._id) !== bookId);
    user.ReturnedBooks.push(bookToReturn);

    // Remove the borrowing timestamp for the book
    bookToReturn.borrowedTimestamp = null;

    await user.save();

    console.log('Book returned successfully');

    res.status(200).send('Book returned successfully');
  } catch (error) {
    console.error('Error returning book:', error);
    return res.render('include/_error-page');

  }
});


// Create a transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Use your email service provider
//   auth: {
//       user: 'goldmidas481@gmail.com', // Your email address
//       pass: 'vaie pqbw tvfc pfsf' // Your password (you may use an app password for Gmail)
//   }
// });

// route.get('/send-email', (req, res) => {
//   // Email content
//   const mailOptions = {
//       from: 'goldmidas481@gmail.com', // Sender email address
//       to: 'favouredeh797@gmail.com', // Receiver email address
//       subject: 'shanghai is cool',
//       text: 'Now God is no respecter of any man, he respects principles, His own not yours' 
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           console.error('Error occurred:', error);
//           res.status(500).send('Error occurred while sending email');
//       } else {
//           console.log('Email sent:', info.response);
//           res.send('Email sent successfully');
//       }
//   });
// });



// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'goldmidas481@gmail.com', // Sender email address
//         pass: 'vaie pqbw tvfc pfsf', // Sender email password or application-specific password
//     },
// });

// const generateRandomCode = () => {
//     return Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
// };

// route.get('/send-email', async (req, res) => {
//     const userEmail = req.query.userEmail; // Get the user email from the request

//     // Generate a random 4-digit number
//     const verificationCode = generateRandomCode();

//     // Email content
//     const mailOptions = {
//         from: 'goldmidas481@gmail.com', // Sender email address
//         to: userEmail, // Receiver email address
//         subject: 'Verification Code',
//         text: `Your verification code is: ${verificationCode}`,
//     };

//     // Send email
//     transporter.sendMail(mailOptions, async (error, info) => {
//         if (error) {
//             console.error('Error occurred:', error);
//             res.status(500).send('Error occurred while sending email');
//         } else {
//             console.log('Email sent:', info.response);

//             // Update user's VerifyCode field with the generated verification code
//             try {
//                 const user = await UserDB.findOneAndUpdate(
//                     { Email: userEmail },
//                     { VerifyCode: verificationCode },
//                     { new: true }
//                 );
//                 console.log('User:', user);
//                 // res.render('include/_ResetCode', {verificationCode, userEmail})
//             } catch (updateError) {
//                 console.error('Error updating user:', updateError);
//                 res.status(500).send('Error updating user');
//             }
//         }
//     });
// });

// route.get('/verify-code', async (req, res) => {
//   try {
//       const { userEmail, verificationCode } = req.query;

//       const user = await UserDB.findOne({ Email: userEmail });

//       if (!user) {
//           return res.status(404).send('User not found');
//       }

//       if (user.VerifyCode === verificationCode) {
//           // Verification successful
//           return res.status(200).send('Verification successful');
//       } else {
//           // Verification failed
//           return res.status(400).send('Verification failed');
//       }
//   } catch (error) {
//       console.error('Error verifying code:', error);
//       return res.status(500).send('Error verifying code');
//   }
// });

// route.get('/verify-code', async (req, res) => {
//     const { userEmail, digit1, digit2, digit3, digit4 } = req.query;
//     const verificationCode = `${digit1}${digit2}${digit3}${digit4}`;

//     // Perform the verification logic here
//     try {
//         const user = await UserDB.findOne({ Email: userEmail });

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         if (user.VerifyCode === verificationCode) {
//             // Verification successful
//             return res.status(200).send('Verification successful');
//         } else {
//             // Verification failed
//             return res.status(400).send('Verification failed');
//         }
//     } catch (error) {
//         console.error('Error verifying code:', error);
//         return res.status(500).send('Error verifying code');
//     }
// });




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'goldmidas481@gmail.com',
      pass: 'vaie pqbw tvfc pfsf',
  },
});

// Generate a random 4-digit number
const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Endpoint to send the verification email
route.get('/send-email', async (req, res) => {
  const userEmail = req.query.userEmail;

  // Generate a random 4-digit number as verification code
  const verificationCode = generateRandomCode();

  // Email content
  const mailOptions = {
    from: 'goldmidas481@gmail.com',
    to: userEmail,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  // Send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
      return res.render('include/_error-page');

    } else {
      console.log('Email sent:', info.response);

      // Store the userEmail in session
      req.session.userEmail = userEmail;

      // Update user's VerifyCode field with the generated verification code
      try {
        const user = await UserDB.findOneAndUpdate(
          { Email: userEmail },
          { VerifyCode: verificationCode },
          { new: true }
        );
        console.log('User:', user);
        res.render('include/_ResetCode', {verificationCode, userEmail})

      } catch (updateError) {
        console.error('Error updating user:', updateError);
        res.redirect('include/_error-page');
      }
    }
  });
});

// Endpoint to verify the code received from the user
route.get('/verify-code', async (req, res) => {
  const { digit1, digit2, digit3, digit4 } = req.query;
  const verificationCode = parseInt(`${digit1}${digit2}${digit3}${digit4}`, 10); // Convert entered code to a number

  // Retrieve userEmail from session
  const userEmail = req.session.userEmail;

  // Log received parameters
  console.log('Received verification request for:', userEmail, 'with code:', verificationCode);

  // Perform the verification logic here
  try {
    const user = await UserDB.findOne({ Email: userEmail });

    if (!user) {
      console.log('User not found');
      return res.render('include/_error-page');
    }

    console.log('Found user:', user);

    console.log('User verification code:', user.VerifyCode); // Log the user's verification code
    console.log('Verification code entered:', verificationCode); // Log the entered verification code

    if (user.VerifyCode === verificationCode) {
      // Verification successful
      console.log('Verification successful');           
      return res.render('include/_New-password', {verificationCode, userEmail})  
    } else {
      // Verification failed
      console.log('Verification failed');
      return res.redirect('include/_error-page');
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    return res.redirect('include/_error-page');
  }
});

route.post('/change-password', async (req, res) => {
  const { newPassword } = req.body; // Assuming the new password is sent in the request body

  // Retrieve userEmail from session
  const userEmail = req.session.userEmail;

  try {
    // Find the user by email
    const user = await UserDB.findOne({ Email: userEmail });

    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }

    // Encrypt the new password before updating
    const encryptedNewPassword = CryptoJs.AES.encrypt(newPassword, 'benny').toString();

    // Update the user's password with the new encrypted password
    user.PassWord = encryptedNewPassword; // Assuming your password field is named PassWord

    // Save the updated user
    await user.save();

    console.log('Password changed successfully');
    return res.redirect('/login');
  } catch (error) {
    console.error('Error changing password:', error);
    return res.redirect('include/_error-page');
  }
});



module.exports = route


