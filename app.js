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

As a preliminary exercise, we will create a route that, upon navigation,  creates a predefined "campground" and saves it to our database
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
app.get("/makecampground", async (req, res) => {
    const camp = new Campground({title: "My Backyard", description: "Cheap camping"})
    await camp.save()
    res.send(camp)
})

app.get ("/", (req, res) => {
    res.render("test")
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})