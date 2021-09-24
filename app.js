/*
Start by initializing NPM using "npm init -y". This creates your "package.json"

We then install our "base": Express, EJS, and Mongoose using "npm i express ejs mongoose"

After installing, we then perform the general setup of our Express module.
*/
// const express = require("express");
// const app = express();


// app.get ("/", (req, res) => {
//     res.send("Hello from YelpCamp")
// })
// app.listen(3000, () => {
//     console.log("serving on port 3000")
// })

/*
We then perform the general setup on our EJS module. We create a views folder, create a "test" page, and then set our "views" directory. In order to do so, we must first require "path" functionality from Express.

*Go to test.ejs*
*/

// const path = require("path")

// app.set("view engine", "ejs")
// app.set("views", path.join(__dirname, "views"))

// app.get ("/", (req, res) => {
//     res.render("test")
// })

/*
We then set up our Mongoose module. We create a models directory, create a "models" file, set up our Campground schema, and create a Campground model for export.

*Go to models.js*

Lastly, we configure Mongoose to connect to our MongoDB database.
*/

// const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
//     useNewUrlParser: true,
//     // useCreateIndex: true, // When I enable this option, mongoose does not work.
//     useUnifiedTopology: true
// })

// const db = mongoose.connection; // Unnecessary; just for speed
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });



/*
Now that we have set up all our basic modules, we will now bring the initialization code together.
*/


/*
--- CODE TRANSITION: 00c to 01a ---
*/


/*
We now create a route that allows users to create new Campground entries.

To do this, we use the Schema that we created in models.js. In order to gain access to that schema, we import it by using "require".

As a preliminary exercise, we will create a route that, upon navigation,  creates a predefined "campground" and saves it to our database.
*/




// --- CODE TRANSITION: 01a to 01b ---

/*
To first populate our Campgrounds database, we will introduce some "seed" entries.

We will do this by adding city data from an external source in a new file called "cities.js" and adding some campground descriptors in a new file called "seedHelpers.js". By combining campground descriptions and a city together, we can generate new campgrounds.

These files will go into a "seeds" folder as a means of identifying that that the database entries that we obtain from those files are "different" from user-generated entries. 

We also need to create an "index.js" within that folder in order to be able to send the seed-generated campgrounds into our database. In this "index.js", we will set up our modules as we did with "app.js". In addition, we will also include a function "seedDB" that will be responsible for generating the "seed" campgrounds.

"seedDB" works by creating a loop in which a "descriptor" and a "place" from "seedHelpers.js" is combined with a city from "cities.js"

*Go to cities.js, seedHelpers.js, index.js*
*/

// --- CODE TRANSITION: 01c to 02a ---

/*
We will now work on implementing basic CRUD functionality for our website.

First, we create an index page. That is, a way for a user to navigate to a webpage containing all the campground entries in our database. This involves the creation of an Express route and a webpage (with EJS functionality). 

I will place the EJS template in views/campgrounds and call it "index.ejs"

*Go to index.ejs*
*/



// --- CODE TRANSITION: 02a to 02b ---

/*
Now that we have created our Campground index, we will now proceed to create our "Show Details" route and associated webpage.

To do this, we will use "req.param" to "res.render" unique routes for each campground in our database.

We will also have to create a template HTML page that will provide the formatting for all of the information of each campground. I will call this "show.ejs". 

We can also modify our index page so that each campground is a hyperlink to its associated "show details" page.

*Go to index.ejs and show.ejs*
*/


// --- CODE TRANSITION: 02b to 02c ---

/*
We will now add a page to create new Campground entries.

We will need two routes. One route to send the user to a page where they can submit a form with the new campground details and another route where that form can be sent so that Mongoose can pass the information to MongoDB to store it in the database. The former will be a GET route like the others but the latter will be a POST route.

We will also need a webpage to contain the form. I will call it "new.ejs" Also, I will add a link to the "Create New Campground" page on the index page and a link in "show.ejs" to return to the Campground index.

*Go to index.ejs, show.ejs, and new.ejs*
*/

/*
***&&& MODULE SETUP &&&***
*/
const express = require("express");
const path = require("path")
const app = express();
const Campground = require ("./models/models.js") // Imports our "Campground" schema

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    // useCreateIndex: true, // When I enable this option, mongoose does not work.
    useUnifiedTopology: true
})

const db = mongoose.connection; // Unnecessary; just for speed
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

/*
***&&& EXPRESS ROUTES &&&***
*/


app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

/*
app.post("/campgrounds", async (req, res) => {
    res.send(req.body);
})
// Using only this code for our POST route, we will receive an empty page upon submitting the new campground form. This is because req.body is in a format that is not "renderable" as-is. We need to first declare a parsing "framework" to have Express parse the information contained in req.body into a "readable" form. This is done through the code "app.use(express.urlencoded({extended:true}))"

We can now proceed.
*/

app.use(express.urlencoded({extended:true}))

app.post("/campgrounds", async (req, res) => {
    // console.log(req.body)
    const newCamp = newCampground(req.body.campground);
    // console.log(newCamp)
    await newCamp.save()
    res.redirect("campgrounds")
})

app.get("/campgrounds/:id", async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id) // You have to use "findById". You can't use "find({id:...})" because if you wanted to use "find", the equivalent term would be find({_id: ObjectId("ID String")}). This is not really parsable from req.params.
    console.log(req.params.id) // req.params.id is a string
    res.render("campgrounds/show", {identifiedCamp})
})

app.get("/campgrounds", async (req, res) => {
    const campgroundIndex = await Campground.find({})
    res.render("campgrounds/index", {campgroundIndex})
})

app.get ("/", (req, res) => {
    res.render("test")
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})