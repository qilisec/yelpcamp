 express = require("express")
const app = express();
const router = express.Router({mergeParams: true}) // This is needed in order for our review routes to have access to the campground id parameter that was incorporated as part of the standard "prefix" path for everything in the review Router which we set in app.js.
const path = require("path")
const ejsMate = require("ejs-mate")
const catchAsync = require("../utils/catchAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Campground = require("../models/campgrounds.js")
const Review = require("../models/review.js")

const methodOverride = require("method-override")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.engine("ejs", ejsMate)
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method")) 

const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
//     useNewUrlParser: true,
//     // useCreateIndex: true, // When I enable this option, mongoose does not work.
//     useUnifiedTopology: true
// })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

const { reviewSchema } = require("../schemas.js")

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error) {
        // console.log(error)
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        // console.log("No Error with Joi")
        next()
    }
}

router.post("/", validateReview, catchAsync(async (req, res) => {
    const reviewedCampground = await Campground.findById(req.params.id);
    const newReview = new Review(req.body.review);
    reviewedCampground.reviews.push(newReview);
    await newReview.save();
    await reviewedCampground.save();
    req.flash("success", "Created new review") // Added "Success" Flash message to "New Review" route
    res.redirect(`/campgrounds/${reviewedCampground._id}`)
}))

router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const deleteReviewReference = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    const deleteIdentifiedReview = await Review.findByIdAndDelete(reviewId)
    req.flash("success", "Successfully deleted review") // Added "Success" Flash message to "Delete Review" route
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router // We can now export this "reviews router" to app.js