// const mongoose = require('mongoose')
// const connectDB = async()=>{
//     const mongoUri = "mongodb://localhost:27017/myUsers_database"
//     try{
//         // mongodb connection string
//         const con = await mongoose.connect(mongoUri);

//         console.log(`Mongodb connected : ${con.connection.host}`)
//     }catch(err){
//         console.log(err);
//         process.exit(1);
//     }
// }

// module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = "mongodb+srv://goldmidas481:pUF6SlfEUyldaWDr@cluster0.lcvbbnk.mongodb.net/Libra?retryWrites=true&w=majority";
  try {
    // mongodb connection string
    const con = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access the collection object from the connection
    const db = con.connection;
    const Books = db.collection('bookdatas'); // Replace 'bookdatas' with the actual name of your collection
    const Users = db.collection('userdatabases')
    // Create a compound text index on multiple fields
    await Users.createIndex({'$**': 'text'});
    await Books.createIndex({ '$**': 'text' });

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
