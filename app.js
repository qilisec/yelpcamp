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



/*
***&&& MODULE SETUP &&&***
*/
const express = require("express");
const path = require("path")
const app = express();
const ejsMate = require("ejs-mate")
const Joi = require("joi") // "Requiring" Joi
const catchAsync = require("./utils/catchAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const Campground = require("./models/campgrounds.js")
const methodOverride = require("method-override")

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
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

/*
***&&& EXPRESS ROUTES &&&***
*/


// const validateCampground = (req, res, next) => { // Our new "server-side validation" middle-ware
//     const campgroundSchema = Joi.object({
//         campground: Joi.object({
//          title: Joi.string().required(),
//          location: Joi.string().required(),
//          price: Joi.number().required().min(0),
//          image: Joi.string(),
//          description: Joi.string()
//         }).required()
//     })
//     const {error} = campgroundSchema.validate(req.body) 
//     if (error) {
//         const msg = error.details.map(el => el.message).join(",")
//         throw new ExpressError(msg, 400)
//     } else {
//         next(); // Now that we are placing our "validation" function into a middleware, we need to call "next" to have our request be sent to the next function in our "middle-ware chain" (i.e. when the validation does not produce any errors).
//     }
// }


/*
&&&&&&&&&&&&&&&&&&&&&&&&&
In actuality, having the actual Joi schema be defined in the Joi validation function itself adds unneeded redundancy. We can instead move the Joi schema to a new file and then have the validation function "pull" that schema whenever it is invoked.

We will name this file "schemas.js" and place in the root directory of the app.

*Go to schemas.js*

Once we set up "schemas.js", we can turn campgroundSchema into a module export and use it in "app.js" by "requiring" it. 

Also, now that we are not defining the schema within "app.js", we no longer need to require Joi in app.js.
&&&&&&&&&&&&&&&&&&&&&&&&&
*/

const { campgroundSchema } = require("./schemas") 

/*
&&&&&&&&&&&&&&&&&&&&&&&&&
We use the "destructured" form to "import" campgroundSchema because, in the future, we may create additional Joi schemas within "schemas.js" and by using this destructured form now, we can more easily import more schemas from within schema.js by adding to this destructured form (e.g. const { campgroundSchema, otherSchema, ... } = require("schemas"))
&&&&&&&&&&&&&&&&&&&&&&&&&
*/


const validateCampground = (req, res, next) => { // Our new "server-side validation" middle-ware
    const {error} = campgroundSchema.validate(req.body) 
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next(); // Now that we are placing our "validation" function into a middleware, we need to call "next" to have our request be sent to the next function in our "middle-ware chain" (i.e. when the validation does not produce any errors).
    }
}

app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {identifiedCamp})
}))

app.put("/campgrounds/:id", validateCampground, catchAsync(async (req, res) => { // We tell Express to use our "validation middle-ware" by inserting "validateError" before our anonymous "catchAsync(async(req, res)...)" function
    const {id} = await req.params
    const updateCamp = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true})
    // {new: true is needed in order to have the console display the new details of the updated campground rather than the pre-update details.}
    console.log(id)
    console.log(updateCamp)
    await updateCamp.save()
    res.redirect("/campgrounds")
}))

app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const identifiedCamp = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds") 
    // Careless Mistake: "res.redirect("/campgrounds"), not "res.redirect(campgrounds). This caused a "CastError".
}))

app.get("/campgrounds/new", (req, res) => {
    console.log("New Campground")
    res.render("campgrounds/new")
})

app.post("/campgrounds", validateCampground, catchAsync(async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError("Invalid Campground Data", 400)
    /*
    This is one way of performing "server side" validation but it is insufficient since it's possible that there will be "some" "Campground" content (e.g. name) but not others (e.g. price). 
    */
   const campgroundSchema = Joi.object({
       campground: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string(),
        description: Joi.string()
       }).required()
       /*
       Here we define the schema for Joi to "keep in mind". We can set each property to either be "required" or not. We can also add further "constraints" such as requiring a value be a number greater than 0 or a string to be comprised of only alphanumeric characters
       */
    })
    // const result = campgroundSchema.validate(req.body) 
    /* This line is what actually tells Joi to use the defined schema to validate our submitted requests.
    */
    // console.log(result) // "console.logs" the result of the validation


    // if (result.error) {
    //     throw new ExpressError(result.error.details, 400)
    // }

    /*
    The above code tells our route to "throw" an ExpressError if the result that Joi produced was an error (with status code 400) and have the "message" of that ExpressError be the contents of result.error.details. The problem is that "result.error.details" is an array so as "result.error.details" gets passed down into our custom error handler into our "error" template, what actually ends up being displayed is "Object". The actual "content" of "result.error.details" is contained within the elements of that array.

    Thus, we first need to take all the elements of the "results.error.details" array and "join them together" which then arranges the details into a string.
    */
    const {error} = campgroundSchema.validate(req.body) 
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    }
    const newCamp = new Campground(req.body.campground);
    await newCamp.save()
    res.redirect("/campgrounds")
    })
)

app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const identifiedCamp = await Campground.findById(req.params.id)
    // console.log(req.params.id) // req.params.id is a string
    console.log("Show Details")
    console.log(req.params)
    res.render("campgrounds/show", {identifiedCamp})
}))

app.get("/campgrounds", catchAsync(async (req, res) => {
    console.log("Index")
    const campgroundIndex = await Campground.find({})
    res.render("campgrounds/index", {campgroundIndex})
}))
// For some reason, if I start on "/campgrounds/" and not "/campgrounds", when I click a campground, I get directed to "/campgrounds/campgrounds/..id"

app.get ("/", (req, res) => {
    console.log("test")
    res.render("test")
})

/*
&&&&&&&&&&&&&&&&&&&&&&&&&
The following will be our enhanced custom error handler. We add the following functionality. If we attempt to navigate to a route which was not delineated by any of the route "rules" above, the "app.all("*"...) route is invoked which turns the request that was sent to the user into an error of the custom error class "ExpressError". 

This modified error is then based to our "rudimentary" error handler, which we have modified to be able to "capture" the "statusCode" and "message" properties of the incoming error request ("status code" and "message" being properties of errors of the ExpressErrors error class.). 

Our modified error handler then creates an error as a response, which sets the status code and sends a message based on what the ExpressError error told it.

If we trigger an error while on a "delineated" route, then the "app.all("*",...)" is not invoked and our custom error handler displays an error of status code "500" as well as a generic message, both of which are set as defaults.
&&&&&&&&&&&&&&&&&&&&&&&&&
*/

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})

// app.use((err, req, res, next) => {
//     const {statusCode = 500, message = "Something Went Wrong"} = err
//     res.status(statusCode).render("error") // Changed from "send(message)" to "render("error")"
// })

/*
&&&&&&&&&&&&&&&&&&&&&&&&&
The issue with the above code is that we are not passing any "information" from the error to the template. Thus, we wouldn't have any way of using EJS to display the error's "message". One possibility is that we could pass in those properties a la "render("error", {statusCode, message})". However, if "err" could have a large number of properties, using that method can become tedious. 

An alternative arises if we realize that the only reason we chose to define "statusCode" and "message" as destructured products of "err" was so that we could easily add default values. However, it is possible to add default values to these properties in other ways. Therefore, we can pass the entirety of "err" to "res.render" after defining a default value for "message". This way, we have "access" to all the properties of "err", no matter how many there are.

For example, we can now "access" "err.stack", which is the stack trace generated by the error. We can then place that in the error template, which may be something that we would want to help us fix our code.

*Go to views/error.ejs*
&&&&&&&&&&&&&&&&&&&&&&&&&
*/

app.use((err, req, res, next) => {
    // const {statusCode = 500, message = "Something Went Wrong"} = err
    const {statusCode = 500} = err
    if (!err.message) err.message = "Something Went Wrong"
    res.status(statusCode).render("error", {err}) // Changed from "send(message)" to "render("error", {err})"
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})

// --- Code Transition: 05 to 06 ---

/*
Now that we have learned about setting up relationships between models in MongoDB and how to integrate those relationships in Express, we will now put this into action by creating "review" functionality to Yelp Camp.

We first need to create a "review" schema and then create a "review" model. We will do this in a file separate from where our "campgrounds" model was created. This means that we should rename our "models.js" file to "campgrounds.js"

*Go to models/review.js; rename "models.js" to "campgrounds.js"* 

The reviews that are created will be associated with specific campgrounds. We will express the relationship between the campground and associated reviews by embedding the review ObjectIDs in each campground. This means that we need to add a "reviews" property in our campground schema.

*Go to campgrounds.js*
*/