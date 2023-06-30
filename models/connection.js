require("dotenv").config(); 

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL); // Connect to the MongoDB database 

mongoose.connection; 

module.exports = mongoose; // Export the mongoose object 