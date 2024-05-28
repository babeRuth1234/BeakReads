const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const nodemon = require('nodemon')
const bodyparser = require('body-parser');
const path = require('path');
const fs =  require('fs')
// Define a custom EJS helper function to truncate text
// const ejs = require('ejs');



// Define the custom EJS helper function to truncate text

const connectDB = require("./server/database/connection")

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));


// mongoDB connection
connectDB();
//parse request to body parser
app.use(bodyparser.urlencoded({extended: true})) 

// set view engine
app.set("view engine","ejs")


// app.set("views",path.resolve(__dirname, "views/ejs"))

// load assets
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
  app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, 'UserImages')));
// app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
// app.use(express.static("assets/fonts"));
// app.use('/video', express.static(path.resolve(__dirname, "assets/video")))
app.use((req, res, next) => {
    const token = req.query.token; // You may want to check headers as well.
  
    if (token) {
      try {
        const decodedToken = jwt.verify(token, 'weldoui');
        res.locals.user = decodedToken; // Make user information available to all EJS templates.
      } catch (error) {
        // Handle token verification errors here.
        res.locals.user = null; // Set user to null to indicate no authenticated user.
      }
    } else {
      res.locals.user = null; // No token provided, so no authenticated user.
    }
  
    next();
  });
// node routers
app.use('/',require('./server/routes/router'))

app.listen(PORT, ()=>{
    console.log(`Now it paid attention refusing to miss on its inhertnace on mount  http://localhost:${PORT}`)
})