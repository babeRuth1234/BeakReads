let UserDB = require('../model/model')
let Books = require('../model/bookModel')
const CryptoJs = require('crypto-js')
const path = require('path');
const router = require('express');
const c = require('config');

// we'll be using this line to create and save a user
// exports.create = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({message: "Content can not be empty!"});
//         return;
//     }

//     // And he created them male and female
//     const user = new UserDB({
//         libraryCard:req.body.libraryCard,
//         FirstName:req.body.FirstName,
//         LastName:req.body.LastName,
//         Email:req.body.Email,
//         ProfilePic:req.body.ProfilePic,
//         PassWord: CryptoJs.AES.encrypt(req.body.PassWord, 'benny').toString(),
//         Gender:req.body.Gender ,
//         PaidUser:req.body.PaidUser ,
//         BorrowedBooks:req.body.BorrowedBooks,
//         LikedBooks:req.body.LikedBooks,
//         RequestedBooks:req.body.RequestedBooks,
//         Year:req.body.Year,
//         VerifyCode:req.body.VerifyCode 
//     })

//     // and God said let there be(let it exist)
//     user
//       .save(user)
//       .then(data =>{
//         res.redirect('/library')
//       })
//       .catch(err=>{
//         res.status(500).send({
//             message:err.message || "An erro occured in the create operation"
//         });
//       });   
// }

// Separate function to handle user creation
// Route handler for registration
const generateLibraryCard = async () => {
  // Generate a 4-digit random number
  const randomLibraryCard = Math.floor(1000 + Math.random() * 9000);
  // Check if the generated library card already exists in the database
  const existingUser = await UserDB.findOne({ libraryCard: randomLibraryCard });
  // If it exists, recursively call the function to generate a new one
  if (existingUser) {
      return generateLibraryCard();
  }
  // If it doesn't exist, return the generated library card
  return randomLibraryCard.toString();
};

exports.register = async (req, res) => {
  try {
      // Check if the library card already exists in the database
      const existingUser = await UserDB.findOne({ libraryCard: req.body.libraryCard });

      if (existingUser) {
          const errorMessage = 'Library card is already in use';
          return res.render('include/_register', { errorMessage });
      } else {
          // Proceed with user registration
          try {
              if (!req.body) {
                  return res.status(400).send({ message: "Content cannot be empty!" });
              }

              // Generate a unique library card
              const generatedLibraryCard = await generateLibraryCard();

              // Create a new user
              const user = new UserDB({
                  libraryCard: generatedLibraryCard,
                  FirstName: req.body.FirstName,
                  LastName: req.body.LastName,
                  Email: req.body.Email,
                  ProfilePic: req.body.ProfilePic,
                  PassWord: CryptoJs.AES.encrypt(req.body.PassWord, 'benny').toString(),
                  Gender: req.body.Gender,
                  PaidUser: req.body.PaidUser,
                  BorrowedBooks: req.body.BorrowedBooks,
                  LikedBooks: req.body.LikedBooks,
                  RequestedBooks: req.body.RequestedBooks,
                  Year: req.body.Year,
                  VerifyCode: req.body.VerifyCode,
              });

              // Save the user
              const data = await user.save();
              res.redirect('/library');
          } catch (err) {
              res.status(500).send({
                  message: err.message || "An error occurred in the create operation",
              });
          }
      }
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
  }
};




  // exports.addBook = async (req, res) => {
  //   // Validate request
  //   if (!req.body) {
  //     return res.status(400).send({ message: "Content cannot be empty!" });
  //   }
  
  //   try {
  //     // Create a new book
  //     const book = new Books({
  //       Source: req.body.Source,
  //       Author: req.body.Author,
  //       Year: req.body.Year, // Assuming Year is a Date
  //       PublicationTitle: req.body.PublicationTitle,
  //       ResourceType: req.body.ResourceType,
  //       About: req.body.About,
  //       ShelfLocation: req.body.ShelfLocation,
  //       NumberOfCopies: req.body.NumberOfCopies,
  //     });
  
  //     // Save the book data
  //     const data = await book.save();
  //     res.redirect('/library'); // Redirect to a success page or appropriate route
  //   } catch (err) {
  //     res.status(500).send({
  //       message: err.message || "An error occurred in the create operation",
  //     });
  //   }
  // };
  
  
// exports.find("/login", async(req, res)=>{
//     try {
//         const user = await UserDB.findOne({Email: req.body.Email});
//         !user && res.status(401).json("Wrong password or username!");

//         const bytes = CryptoJs.AES.decrypt(user.PassWord, "benny");
//         const originalPasswordb = bytes.toString(CryptoJs.enc.Utf8);

//         originalPasswordb !== req.body.PassWord &&
//             res.status(401).json("Wrong password or username!");

//             res.status(200).json(user)
//     }catch(err){
//         res.status(500).json(err);
//     }
// });
// we'll be attempting to return and retrieve all users /return and retrieve all users to the old dsc club house
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        UserDB.findById(id)
         .then(data =>{
            if(!data){
                res.status(404).send({message: "could not find user with id" + id})
            }else{
                res.send(data)
            }
         })
         .catch(err=>{
            res.status(500).send({message: "Err could not retrieve user with id" + id})
         })
    }else{
        UserDB.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error Occured while retrieving user data"})
        })
    }
}


// exports.find = (req,res)=>{
//     if(req.query.Email){
//         UserDB.find(req.query.Email)
//          .then(data =>{
//             if(!data){
//                 res.status(404).send({message: "could not find user with id" + id})
//             }else{
//                 res.send(console.log(data))
                
//             }
//          })
//          .catch(err=>{
//             res.status(500).send({message: "Err could not retrieve user with id" + id})
//          })
//     }else{
//         UserDB.find(req.query.email)
//         .then(user=>{
//             res.send(console.log(user))
//         })
//         .catch(err=>{
//             res.status(500).send({message:err.message || "Error Occured while retrieving user data"})
//         })
//     }
// }



// module.exports = login;

// update a noobie by their id
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Now without substance how then shall i change what is with that which is not"})
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
      .then(data =>{
        if(!data){
            res.status(404).send({message: `cannot update user with ${id}for it seems this user be not`})
        }else{
            res.send(data)
        }
      })
      .catch(err=>{
        res.status(500).send({message: "now it erred from the path we planned for it and this user info could not be updated"})
      })
}

// attempt to remove max verstappen from the race via his specified id
exports.delete = (req,res)=>{
    const id = req.params.id;

    UserDB.findByIdAndDelete(id)
     .then(data =>{
        if(!data){
            res.status(404).send({message:`Cannot delete user with id ${id}.Maybe id is wrong`})
        }else{
            res.send({
                message:"User was deleted successfully!"
            })
        }
     })
     .catch(err=>{
        res.status(500).send({
          message:   `could not delete user with id${id}`
        });
     }); 
}
