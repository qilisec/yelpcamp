const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Unnecessary; just for speed

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
})

module.exports = mongoose.model("Campground", CampgroundSchema)
// We ask Mongoose to create a model named "Campground" by invoking the method "mongoose.model". The model is created based on the schema "CampgroundSchema".