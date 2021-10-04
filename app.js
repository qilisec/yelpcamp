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
app.post("/campgrounds", async (req, res) => {
    res.send(req.body);
})
// Using only this code for our POST route, we will receive an empty page upon submitting the new campground form. This is because req.body is in a format that is not "renderable" as-is. We need to first declare a parsing "framework" to have Express parse the information contained in req.body into a "readable" form. This is done through the code "app.use(express.urlencoded({extended:true}))"

We can now proceed.
*/


// --- CODE TRANSITION: 02c to 02d ---

/*
Now that we have our route to create new campgrounds, we will create the route to delete campgrounds. We will also add a button on a given campground's details page which will delete the route.

Unlike with the first lesson on creating CRUD functionality, there are some additional considerations that we will need to make in our Yelp Camp project. This can be especially observed in this "Delete" route.

For example, we probably do not want any and everybody to be able to delete a campground entry so we will also need to consider how to incorporate aspects of authorization into our delete route as well. In addition, "deletion" of a campground is not just able deleting "information" about a campgrounds "name" and "location". In the final product, we will also provide functionality to rate campgrounds as well as display images. When a campground is deleted, we will also like to delete its associated scores and pictures as well.

However, for now we will just set up the basic delete route. This will involve the use of a DELETE method. which will be sent upon clicking a button that submits a form. However, forms can natively only send GET and post requests. In order to have the form send a DELETE request, we will need to install and employ a package called "Method-Override" which will "hi-jack" the form upon submission and change its method. Thus, we will need to install and set up "Method-Override".

Installation is performed using "npm i method-override"
To "enable" Method-Override, we use "const methodOverride = require ("method-override")" and "app.use(methodOverride("_method"))".


*Go to show.ejs*
*/

// --- CODE TRANSITION: 02d to 02e ---

/*
Lastly, we create "edit" routes for our campsites. This involves making two routes. One route that directs users to a campground-specific page where they can make their edits to the campground details (i.e. in a form) and another route that submits the form as a PUT request which then updates the associated document in our MongoDB database.

We also need to create a template for the campground edit page in which the campground details are pre-populated. Lastly, we need to create buttons on a campground's details page that will direct the user to the campground's "edit" page. This will be found in views/campgrounds/edit.ejs

As with the DELETE route, we need to use "Method Override" in order to convert the form submission's method from POST to Put, which is the method we will use to set up the route responsible for actually sending the changed details to our database.

*Go to show.ejs and edit.ejs*
*/


// --- CODE TRANSITION: 02 to 03 ---

/*
We will now start working on the appearance of the site. That is, we will begin working on the styling. To do this, we will be using Bootstrap

Before that, we will set up our ejs templates so that we can more easily export our styling to every page. To facilitate this setup, we will download "EJS-mate" which improves on the ease-of-use of partials by consolidating those partials into a single "boilerplate" file that can serve as the starting point of every one of our "EJS pages". This way, we do not need to add multiple partial templates to each page. Rather, the "partial" that is included in each template page will actually be the body of the text.

We install "EJS-mate" using "npm i ejs-mate"

We then "initialize" the module by first "requiring" it and then setting "app.engine" to use "ejs-mate".

Afterwards, we create a "layouts" directory in our "views" directory. This is where we place the file that will serve as our "boilerplate"

*Go to ./views/layouts/boilerplate.ejs*
*/

/*
***&&& MODULE SETUP &&&***
*/
const express = require("express");
const path = require("path")
const app = express();
const ejsMate = require("ejs-mate") // Requiring "EJS-mate"
const Campground = require("./models/models.js")
const methodOverride = require("method-override")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.engine("ejs", ejsMate) // Setting "ejs-mate" to be the "engine"
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method")) 

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    // useCreateIndex: true, // When I enable this option, mongoose does not work.
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

/*
***&&& EXPRESS ROUTES &&&***
*/
app.get("/campgrounds/:id/edit", async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {identifiedCamp})
})

app.put("/campgrounds/:id", async (req, res) => {
    const {id} = await req.params
    const updateCamp = await Campground.findByIdAndUpdate(id, {title: req.body.campground.title, location: req.body.campground.location}, {new: true})
    // {new: true is needed in order to have the console display the new details of the updated campground rather than the pre-update details.}
    console.log(id)
    console.log(updateCamp)
    await updateCamp.save()
    res.redirect("/campgrounds")
})

app.delete("/campgrounds/:id", async (req, res) => {
    const identifiedCamp = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds") 
    // Careless Mistake: "res.redirect("/campgrounds"), not "res.redirect(campgrounds). This caused a "CastError".
})

app.get("/campgrounds/new", (req, res) => {
    console.log("New Campground")
    res.render("campgrounds/new")
})

app.post("/campgrounds", async (req, res) => {
    const newCamp = new Campground(req.body.campground);
    await newCamp.save()
    res.redirect("/campgrounds")
})

app.get("/campgrounds/:id", async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id)
    // console.log(req.params.id) // req.params.id is a string
    console.log("Show Details")
    console.log(req.params)
    res.render("campgrounds/show", {identifiedCamp})
})

app.get("/campgrounds", async (req, res) => {
    console.log("Index")
    const campgroundIndex = await Campground.find({})
    res.render("campgrounds/index", {campgroundIndex})
})
// For some reason, if I start on "/campgrounds/" and not "/campgrounds", when I click a campground, I get directed to "/campgrounds/campgrounds/..id"

app.get ("/", (req, res) => {
    console.log("test")
    res.render("test")
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})

// --- CODE TRANSITION: 03a to 03b ---

/*
Now that we have set up "EJS-Mate," we are ready to begin including CSS into our webpages. We will do this via Bootstrap. Thus, we will need to set up our webpages to "pull" the resources and scripts that Bootstrap needs upon navigation. We can do this easily by incorporating that code within our "boilerplate" layout.

*Go to boilerplate.ejs*
*/