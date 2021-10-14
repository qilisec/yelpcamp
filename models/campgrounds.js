const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Unnecessary; just for speed
const Review = require("./review.js") // We "require" the review schema in order to be able to "target" the reviews within a campground.

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

/*
Mongoose middleware consists of behavior that can be coded whenever Mongoose detects another Mongoose method being invoked. It consists of:

SchemaName.MiddlewareType("hook", FunctionToExecute)

The "hook" refers to the method that needs to be invoked in order for Mongoose to execute the middleware. You could describe the "hook" to be the Mongoose method that Mongoose is "listening for". 

There is a quirk. Firstly, some Mongoose methods, while they are considered different in non-middleware contexts, will be "lumped together" for the purposes of declaring the hook.

For example, the Mongoose methods "findOneAndDelete" and "findByIdAndDelete" are different methods but when creating middleware that "listens" for those methods, the hook will be "findOneAndDelete" for both cases. 

Mongoose middleware is added between the declaration of a schema and the declaration of the associated model. Each Mongoose middleware comes in two "forms", "_.pre" and "_.post". The "_.pre" methods are functions that have "references" as parameters. This is in contrast with the "_.post" methods, which are functions that have documents as parameters.The "form" that you choose will determine how you construct the function and what "data" you have access to. We will use the "_.post" form of the middleware because we want our middleware to delete every entry in the "reviews" property of the deleted campground. In order to delete those reviews, we have to have access to them, which means we need access to the document.
*/



CampgroundSchema.post("findOneAndDelete", async function(doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Campground", CampgroundSchema)
// We ask Mongoose to create a model named "Campground" by invoking the method "mongoose.model". The model is created based on the schema "CampgroundSchema".