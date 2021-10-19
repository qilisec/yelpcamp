/*
We first need to require express and express.router()

Afterwards, we need to move all our campground "routes" and any dependencies to this new file. We also need to replace any instances of "app" within our routes with "router". 

We also need to change the "paths" that our routes are set to because if we don't, we will ultimately be be having our router send users to "../campgrounds/campgrounds/....

Lastly, we need to check to see if any instances where we designate paths (e.g. when requiring other files) need to have their paths amended due to the difference in relative position between this new campground router file and "app.js".
*/

const express = require("express")
const app = express();
const router = express.Router({mergeParams: true})
const path = require("path")
const ejsMate = require("ejs-mate")
const catchAsync = require("../utils/catchAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Campground = require("../models/campgrounds.js")
const methodOverride = require("method-override")
const flash = require("connect-flash") // Requiring Flash

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

const { campgroundSchema } = require("../schemas.js")

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body) 
    if (error) {
        // console.log(error)
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        // console.log("No Error with Joi")
        next();
    }
}

router.use(flash()) // Initializing "Flash"

router.get("/:id/edit", catchAsync(async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {identifiedCamp})
}))

router.put("/:id", validateCampground, catchAsync(async (req, res) => {
    const {id} = await req.params
    const updateCamp = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true})
    // console.log(id)
    // console.log(updateCamp)
    await updateCamp.save()
    req.flash("success", "Successfully updated campground!") // Adding "Success" Flash message trigger to our "Edit Campground" route
    res.redirect("/campgrounds")
}))


router.delete("/:id", catchAsync(async (req, res) => {
    const identifiedCamp = await Campground.findByIdAndDelete(req.params.id)
    req.flash("success", "Successfully deleted campground") // Adding "Success" Flash message trigger to our "Delete Campground" route
    res.redirect("/campgrounds")
}))

router.get("/new", (req, res) => {
    // console.log("New Campground")
    res.render("campgrounds/new")
})

router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save()
    req.flash("success", "Successfully made a new campground!") // Creating a flash message with id of "success" and message of "Successfully made a new campground!". Since we create this flash message in the post route, Flash is being messaged that it should pay attention to this "route" and when the route "occurs", to prep the flash message
    res.redirect(`/campgrounds/${newCamp._id}`) // This corresponds to the "show" template.
    })
)

router.get("/:id", catchAsync(async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id).populate("reviews")
    // console.log("Show Details")
    // console.log(req.params)
    // console.log(identifiedCamp.reviews)
    // res.render("campgrounds/show", {identifiedCamp, msg: req.flash("success")}) // No longer needed
    if (!identifiedCamp) {
        req.flash("error", "Cannot find that campground!")
        return res.redirect("/campgrounds")
    }
    res.render("campgrounds/show", {identifiedCamp})
}))

router.get("/", catchAsync(async (req, res) => {
    // console.log("Index")
    const campgroundIndex = await Campground.find({})
    res.render("campgrounds/index", {campgroundIndex})
}))
// For some reason, if I start on "/campgrounds/" and not "/campgrounds", when I click a campground, I get directed to "/campgrounds/campgrounds/..id"



module.exports = router // We can now export this "campgrounds router" to app.js