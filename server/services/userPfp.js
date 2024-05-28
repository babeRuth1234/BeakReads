const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserDB = require('../model/model');
const jwt = require('jsonwebtoken');

// Define multer storage and upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/UserImages'); // Define the folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

// Handle the image upload
router.post('/upload', upload.single('userImage'), async (req, res) => {
  try {
    const { filename } = req.file; // The filename of the uploaded image
    const token = req.session.token; // Retrieve the token from the session
    
    if (token) {
      // The user information is already available in req.session.user
      const user = req.session.user;

      // Update the user's image property in the Mongoose schema
      user.ProfilePic = filename;
      await user.save();
      console.log(router)
      // Redirect to the user profile page or any other desired page
      res.redirect('/user');
    } else {
      res.status(401).json({ message: 'Token not provided' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
