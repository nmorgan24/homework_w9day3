const mongoose = require("./connection"); // Import the Mongoose connection object file

const animalSchema = new mongoose.Schema({
  species: { type: String, required: true },
  extinct: { type: Boolean },
  location: { type: String },
  lifeExpectancy: { type: Number },
});

const Animal = mongoose.model("Animal", animalSchema); // Create a Mongoose model using the animalSchema

module.exports = Animal; // export the animal model for use in other files