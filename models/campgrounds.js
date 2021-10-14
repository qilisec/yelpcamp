const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Unnecessary; just for speed

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number, // Changed to "number"
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

module.exports = mongoose.model("Campground", CampgroundSchema)
// We ask Mongoose to create a model named "Campground" by invoking the method "mongoose.model". The model is created based on the schema "CampgroundSchema".