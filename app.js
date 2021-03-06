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


// --- CODE TRANSITION: 03a to 03b ---

/*
Now that we have set up "EJS-Mate," we are ready to begin including CSS into our webpages. We will do this via Bootstrap. Thus, we will need to set up our webpages to "pull" the resources and scripts that Bootstrap needs upon navigation. We can do this easily by incorporating that code within our "boilerplate" layout.

*Go to boilerplate.ejs*
*/

// --- CODE TRANSITION: 03b to 03c ---

/*
Now that we have set up Bootstrap, we will begin adding styling and extra functionality to our web pages. Ultimately, we will add a navbar, header and footer, campground images, as well as overall styling.

To expedite this, I will be copying content when I don't feel that there is any educational benefit to writing out the code. 

We will first set up the navbar. This will involve writing the navbar code and then announcing it as a partial. Afterwards, we will incorporate the navbar partial in our boilerplate layout.

*Go to views/partials/navbar.ejs; Go to boilerplate_start.ejs*

After we have created our navbar, the next step is to create a footer. This will be a partial as well.
*/

// --- CODE TRANSITION: 03c to 03d ---

/*
We will now add images to each of our campgrounds. To do this, we need to find an image source. We will also need to update our campground model, which will involve also updating our Campground schema. Lastly, we will need to update our Campground "seeding" function to generate a new set of campgrounds that we can "play around" with, now having included the images. Afterwards, we will add our styling which will incorporate these new images.

We will obtain our images from a website called "Unsplash".

*Go to models/campground.js, seeds/index.js*
*/

/*
Once we have created a new set of Campgrounds with descriptions, images  and prices, we can now modify our "show" template to display the image stored in the document.

*Go to campgrounds/show.ejs*
*/

/*
Once we have set up the "show" page for our new campgrounds, we can begin styling for our index page.

We will display our campground entries using "Bootstrap Cards"

*Go to campgrounds/index.ejs*
*/

/*
Once we have the basic styling complete for our index template, we can begin styling for our "new campground" form. 

We will use a "grid" layout

*Go to campgrounds/new.ejs*
*/

/*
We will style our "edit" template to match the styling on our "new campground" template.

*Go to campgrounds/edit.ejs*
*/

/*
We will style our "show"template to match the styling on our "New Campground" and "Edit Campground" templates.

As with our index page, we will use "Bootstrap Cards" along with a "grid" layout.

*Go to campgrounds/show.ejs*
*/


// --- Code Transition: 03 to 04 ---



/*
Now that we have set up our basic CRUD routes and styled them, we will learn how to handle errors in Express. To do this, I will create a separate JS file where I will record my notes on the lesson. This file will be "notes_on_errors.js"

*Go to notes_on_errors.js*
*/

// --- Code Transition: 04 to 04.5 ---

/*
Now that we have finished learning about Express Error Handling, we now want to incorporate some user-visible input validation (i.e. client-side validation). This includes features such as the user being alerted as to when they have not filled out a required entry on a form and having the website prevent users from actually submitting forms where information is missing. 

To do this, we will be using Bootstrap, which is a CSS "tool". However, this means I need to learn CSS. Therefore, I will have to go back and learn about CSS from pretty much near the beginning.

As such, I will put this Yelp-Camp project "on-hold" until I have the necessary knowledge to continue.
*/


// --- Code Transition: 04.5 to 05 ---

/*
We will now add "client-side" validation. This will prevent users from submitting new campgrounds or editing campgrounds with "improper values".

We can do this simply by adding the "required" attribute to our input tags as a HTML form feature. However, this is not attractive design and also, it won't help in the cases where users input "wrong" data (i.e. strings), only in cases where users completely fail to input strings for any campground attribute fields.

We will instead use Bootstrap to handle "client-side" validation. Bootstrap can verify whether the user has submitted "appropriate" and "sufficient" information for each campground field as well, in the cases where the user hasn't, inform the user what they need to fix.

We will first work on the "New Campground" template. Following that, we will change the "Edit Campground" template.

*Go to views/campgrounds/new.ejs*
*/


// --- Code Transition: 05a to 05b ---

/*
In the previous section, we learned about how to create custom error handlers for Express using a farm-stand web app as our reference "program". We will now set up the same kind of custom error handling for our YelpCamp web application.

We start by creating the custom error handler as well as wrapping our CRUD routes in "try-catch" statements. Since most of our routes involve asynchronous behavior, our "catch" portion needs to involve passing the "error" to the "next" function.
*/


// --- Code Transition: 05b to 05c ---

/*
We will now import the "error class" that we created in our lesson involving "farm stand" into our YelpCamp app.

In addition, we will import the function that created "wrappers" around the async functions of our routes which facilitate our ability to catch errors generated by asynchronous behavior.

We will place both of these "tools" into a newly created folder called "utils". In there, we will create "ExpressError.js" and "catchAsync.js".

*Go to "/utils/ExpressError.js" and "/utils/catchAsync.js"*

After recreating these pieces of code, we will import them into app.js and require them.

We then need to modify our routes so that we are using the "catchAsync" "wrapper" function
*/


// --- Code Transition: 05c to 05d ---

/*
We can improve the utility of our rudimentary custom error handler we've created by involving the more robust error class written in "ExpressError.js" which will extract more useful information from the error which can then be passed onto our error handler.

We must first "require" the Express Error handler.

We can then create new routes for scenarios where we would want to generate errors. For example, a route to any URL that isn't of the form "/campgrounds/....". This should produce an error because (as of currently), we have no "content" that would require a URL that isn't "/campgrounds/...". 
*/



// --- Code Transition: 05d to 05e ---

/*
Now that we have set up our custom error handler and error class, it would also be beneficial to create a way of displaying the new error information without relying solely on "res.send". To do this, we can create a "error" template.

We will call this template "error.ejs" and place it in the views directory. We can style this template using Bootstrap. 

*Go to "views/error.ejs"*

After creating our "error" template, we can have our custom error handler "res.render" that template instead of using "res.send".
*/




// --- Code Transition: 05e to 05f ---

/*
While we have already set up client-side validation for the creation and editing of campgrounds, we still do not have a "robust" form of validation. Our client side validation can be circumvented if a "direct" POST or PUT request is sent to our website using something like Postman. 

The next step in creating a stronger implementation of validation is to use "server side" validation. Whereas client-side validation looks at the contents of the proposed request and blocks it from being sent out if not appropriate, server-side validation will look at the contents of the request after it is sent but prevent it from being saved into our Database if the information given is not "appropriate". The most primitive way of doing so is to add "validation steps" for every property on our creation and update routes but this does not scale well if there are a lot of properties. 

To perform server-side validation efficiently, we will use a new npm package called "JOI". This can be installed using "npm i joi". After installation, we need to "require" JOI and then create a "JOI schema". This "JOI schema" will define to JOI, what each "submission" should look like. We then tell JOI to perform validation on each submission, following the schema we constructed.
*/


// --- Code Transition: 05f to 05g ---

/*
Instead of defining the schema within the route that we would like "Joi" to apply to, we can instead define the schema and subsequent "checks" in a Express middleware which will allow us to easily enable this validation for routes of our choosing.
*/


// --- Code Transition: 05 to 06 ---

/*
Now that we have learned about setting up relationships between models in MongoDB and how to integrate those relationships in Express, we will now put this into action by creating "review" functionality to Yelp Camp.

We first need to create a "review" schema and then create a "review" model. We will do this in a file separate from where our "campgrounds" model was created. This means that we should rename our "models.js" file to "campgrounds.js"

*Go to models/review.js; rename "models.js" to "campgrounds.js"* 

The reviews that are created will be associated with specific campgrounds. We will express the relationship between the campground and associated reviews by embedding the review ObjectIDs in each campground. This means that we need to add a "reviews" property in our campground schema.

*Go to campgrounds.js*
*/

// --- Code Transition: 06a to 06b ---

/*
We now need to add a form that allows us to write reviews.

We will add the form on the campground page itself instead of navigating to a separate page where a review can be composed. Along with the review, we will set up functionality that allows users to submit a "rating" of the campground

*Go to campgrounds/show.ejs*

After we have set up the "review" form in our "show" template, we need to add a route that triggers Mongoose to save the review.
*/



// --- Code Transition: 06b to 06c ---

/*
Now that we have set up our POST route to create new reviews, we should add client-side and server-side validation to our review form. The client-side validation will be performed by bootstrap and the server-side validation will be performed by "Joi".

In order to enable server-side validation for our reviews, we must add a "review schema" for Joi.

*Go to views/campgrounds/show.ejs; go to schemas.js*

Once we create our Joi review schema, we must "require" it and create an associated "middle-ware" that uses the Joi review schema in order to perform the validation "test" of the request. If the request sent is invalid, the middle-ware will throw a custom error but if the request is valid, the middle-ware will pass the request onto the next function.

Finally, we attach the new review validation middle-ware only to the review POST route so that the middleware will only intercept those POST requests made to create new reviews.
*/


// --- Code Transition: 06c to 06d ---

/*
After filling out the functionality of the review submission process, our next step is to display the reviews that have been submitted.

To display the reviews associated with a campground on that campground's "show" page, we need to call for the ObjectIDs of all the reviews in that campground's "review" property and then populate them. This will generate the actual "content" of the review.

This "calling" and subsequent populating of the campground's reviews accounts upon navigation to that campground's "show" page. Thus, the code that instructs Mongoose to act will be placed in the GET route for a campground's "show" page.
*/


// --- Code Transition: 06d to 06e ---

/*
Next, we will add styling to the submitted reviews.

*Go to views/campgrounds/show.ejs*
*/



// --- Code Transition: 06e to 06f ---

/*
We will now add a route for review deletion along with a corresponding button (i.e. form) that will submit the DELETE request.

The "app.delete" route will need to contain (as params) the review ID.
*/



// --- Code Transition: 06f to 06g ---

/*
We will now introduce Mongoose middleware that will delete reviews associated with a campground when that specific campground is deleted. This serves to keep our database "clean".

Middleware is introduced in Mongoose by adding code to our "models" files. Since we want our middleware to run when we delete our campgrounds, we will add the middleware code to our campgrounds model file.

*Go to models/campgrounds.js*
*/


// --- Code Transition: 06 to 07 ---

/*
Now that we have learned about the Express router, we can reorganize and "clean up" the routes in our "app.js" file by creating new router files for our campground routes and review routes. We will place those files in a new "routes" folder. We will then transfer the associated routes from app.js into those new route files along with any associated functions or middleware.

*Go to routes/campgrounds.js*

Once we have moved all appropriate routes to the campground router, we need to require that router in "app.js" as well as invoke "app.use" to inform Express when this specific router should be active.

Once we have verified that the campground router works, we can use the same process for the "reviews" routes. We will have all our review Routes be automatically "affixed" with "/campgrounds/:id/reviews" using "app.use". One thing we need to be cognizant of is that when we are "obtaining" params from the "app.use" affix, those params are not accessible in our reviews.js router by default. In order for our routes in reviews.js to have "access" to those params captured by app.js, we need to add a "mergeParams" setting to our express.router method.

*Go to routes/reviews.js*
*/



// --- Code Transition: 07a to 07b ---

/*
We will want to include "assets" to our web app so that we can "serve" users with static assets and "scripts" whenever users interact with our web app in specific ways.

In order to do so, we need to create a directory "public" where all the assets and scripts that we want to serve our users will be found. We will then also have to use "app.use" in order to designate that directory as the one that Express should consider being the "repository" of those static assets. In fact, we can create separate subdirectories for javascript script files and stylesheets in order to better organize our edits. However, if we do so, we must use the "path.join" method as with our EJS templates in order to ensure that the system can properly navigate the public directory.
*/



/*
Some things that we can put into our "public" directory is our Bootstrap validation script that currently resides in our boilerplate layout header.

*Go to /public/javascripts/validateForms.js*
*/

// --- Code Transition: 07b to 07c ---

/*
We will now incorporate the past lesson on sessions into our Yelp Camp application.

We first need to download Express-Sessions using "npm i express-session". We will then "require" it. The last step in our basic set up will be setting up our "session options"
*/



// --- Code Transition: 07c to 07d ---

/*
Part of the reason why we wanted to introduce Express-Session was so that we could use "Flash" messages. These would be nice to show to users upon creating new campgrounds/reviews and similar processes.

We will need to install Flash using "npm i connect-flash" followed by "requiring" it "invoking" it using "app.use". We can then create specific Flash messages for any routes we wish to have a Flash message be displayed. Note that we since we are using Flash to create messages for specific routes, we will actually need to "require" Flash in those specific router files. In that case, we would then use "router.use" instead of "app.use" in order to initialize Flash. 

*Go to /routes/campgrounds.js*

Once we have initialized Flash and created a Flash message for a chosen route, we then need to assign it a "key/label" and have it be passed to the "res.render" page where we would like for the message to appear. Finally, we have to edit the template for that page so that we can specify where on the page the message should appear

*Go to /views/campgrounds/show.ejs*
*/



/*
We can also create a middleware which will circumvent an otherwise necessary insertion of the 
*/

// --- Code Transition: 07d to 07e ---

/*
Since creating Flash messages and then having the "hook" those messages onto every route on which we would like those messages to appear is tedious, we can facilitate the process by creating an Express middleware that will cause the req.flash("success") message to be assigned to a "res.locals.success" local variable. This means that every route has "access" to this variable; We don't have to explicitly pass it into our rendered templates in order to uses them in those templates. Therefore, we can just go into any template and specify where we would like the Flash message to appear and it will work, even though we don't explicitly "pass" the message through.

We can therefore remove the need to pass "msg: req.flash("success")" into our "router.render" for our "Show Campground" route in "routes/campgrounds.js". However, we will still have to specify which routes we want to act as the "triggers" for the Flash message

*Go to /routes/campgrounds.js*

Note that since we are creating the middleware in "app.js", we will now need to initialize Flash in "app.js". Also note that depending on what we named the "variable" that we passed through to the "Show Campground" page using "router.render", we might have to edit our "show" page in order to correspond with what we chose as the "variable" name for "res.locals". For example, when we placed req.flash("Success") directly into the router.render of the "Show Campground" page, we used "msg" as the variable name. However, when using the middleware, we have assigned "req.flash("Success")" to "res.locals.success". That is, we went from "msg" to "success". We will need to change the "name" in our Show template.
*/


/*
***&&& MODULE SETUP &&&***
*/
const express = require("express");
const path = require("path")
const app = express();
const ejsMate = require("ejs-mate")
const Joi = require("joi") // "Requiring" Joi
const methodOverride = require("method-override")
const session = require("express-session") // Requiring "express-session"
const flash = require("connect-flash") // Requiring "Flash"


const catchAsync = require("./utils/catchAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const Campground = require("./models/campgrounds.js")
const Review = require("./models/review.js") // "Requiring" the new "reviews" model
const campgroundRoutes = require("./routes/campgrounds.js") // "Requiring" the new "router" for the Campground routes
const reviewRoutes = require("./routes/reviews.js") // "Requiring" the new "router" for the review routes

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.engine("ejs", ejsMate)

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method")) 


const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    // useCreateIndex: true, // When I enable this option, mongoose does not work.
    useUnifiedTopology: true
    // useFindAndModify: false
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sessionConfig = { // Setting up our configuration for express-session
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Expires "1 week" from the date cookie was "received"
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true // Provides security from "XSS" insecurities
    }
}

/*
***&&& EXPRESS ROUTES &&&***
*/
app.use(session(sessionConfig)) // Initializing Express-Session to "serve" session cookies to users upon navigating to any page on our web app. 


app.use(flash()) // Unlike before, where we assigned the flash message to be passed to the rendered template directly in the route which was located in routes/campgrounds.js, since we are now setting up an Express middleware that uses Flash in "app.js" itself, we will now need to have "app.use(flash)" set.

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    next();
}) 


app.use(express.static(path.join(__dirname, "Public")))

app.use("/campgrounds", campgroundRoutes)

app.use("/campgrounds/:id/reviews", reviewRoutes)

app.get("/", (req, res) => {
    console.log("test")
    res.render("test")
})


app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})


app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = "Something Went Wrong"
    res.render("error", {err})
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})

// --- Code Transition: 07e to 07f ---

/*
Now that we've set up our Express middleware to help "pass" our "New Campground" Flash message onto our template pages, we can now add some styling to it. In addition, we can partition it as a template partial. This will allow us to easily "export" the styling for our Flash message to all our templates.

We will use Bootstrap to provide styling for the Flash Message. Specifically, we will "contain" our Flash message within a Bootstrap div with a class of "alert" and also attach a button to this div that will be responsible for hiding the message when the user interacts with it.

*Go to /views/partials/flash.ejs*

Once we have our "Flash" partial set up, we will then "import" it in our boilerplate layout, positioning it above our "body" content.

In addition, we can now begin adding our Flash "triggers" to routes other than our "New Campgrounds" route. We can also add such a trigger to our "Edit Campground" route. Similarly, we can also add this Flash message to our "Delete Campground" route.

Note that, while the Flash message on our "New Campground" and "Edit Campground" is the same in terms of its "ID" (i.e. "success" from "req.flash("Success", "...")"), we can actually vary the "message" within that "req.flash" between routes (e.g. "req.flash("Success", "New campground successfully created")" for the "New Campground" route and "req.flash("Success", "Campground successfully updated")" for the "Edit Campground" route.)

We can also add this "Success" Flash message to our Review routes as well.

*Go to /routes/reviews.js*
*/

// --- Code Transition: 07f to 07g ---

/*
Now that we have finished setting up our "Success" Flash message styling and triggers, we can now begin to create other Flash messages. For example, we also need an "Error" Flash message.

As with "Success", we can set up the styling of our "Error" Flash in our "flash" partial.

*Go to /views/partials/flash.ejs*

After we add our styling, our next objective is to add this "Error" Flash message to our routes. However, unlike with our "Success" Flash, deciding when to flash the "Error" message is more difficult. This is because we have already set up a page and styling for any error that is generated. It seems to be redundant to then, after navigating to the error page, to also flash an "error" message.

Thus, we really should only use our "Error" flash message when we don't want the user to see that error page. That is, we should use our "Error" flash message for errors where our best course of action is to send the user away from his initial destination, accompanied with the "Error" Flash message. That is, we use it when we don't actually want the user to see that error message.

*Go to /routes/campgrounds.js*
*/