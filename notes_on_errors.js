// --- CODE TRANSITION: 03 to 04a ---

/*
There are many types of errors. Some are due to improperly written code (e.g. reference errors) but others are due to "unexpected" interactions between the various moving parts of your web app that end to moving data between components of your application in ways that they were not expecting or equipped to handle. This could be due to things like "unaccounted for" inputs such as empty strings or something like an API that's "down" that isn't providing your app with the data it expects.

Express has a built-in error handler. We can also create our own errors that are thrown in scenarios of our own choosing using "throw new Error"
*/

// --- CODE TRANSITION: 04a to 04b ---

/*
We can create error "classes". These are useful for setting up "generic/template/standardized" responses when errors are encountered.

One of the ways in which we may want to "classify" errors is by their status code. We can manually set the error status code of an error using "res.status()". However, this can become tedious when you have many things that you need to handle errors on.

Instead, we can create a new error "class" and modify our code such that instead of generating "errors" (i.e. the outputs of the built-in Express error handler), we can instead generate custom "App Errors".

pass information to a custom error handler to generate the information we would like to have when an error appears.

*Go to AppError.js*
*/

// ***&&& MODULE SETUP &&&***
const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require("./AppError")

// app.use(morgan('tiny'));

// app.use((req, res, next) => {
//     req.requestTime = Date.now();
//     console.log(req.method, req.path);
//     next();
// })

// ***&&& EXPRESS ROUTES &&&***

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    // res.status(401) // We can set status codes like this
    // throw new Error("Password needed")
    throw new AppError("AppError says Password Needed", 403) // We can choose to generate custom "App Errors" instead of the built-in "errors"
}

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

// app.use((req, res) => {
//     res.status(404).send('NOT FOUND!')
// })



app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    console.log("Dash")
    res.send('HOME PAGE!')
})

// const error = function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send("Something broke!")
// }

// app.use((err, req, res, next) => {
//     console.log("**********")
//     console.log("***ERROR**")
//     console.log("**********")
//     res.status(500).send("Oh Boy, we have an error")
//     next(err)
// })

/* 
&&&&&&&&& 
NOTE: We can also pass our custom error classes to our custom error handler 
&&&&&&&&&
*/

// app.use((err, req, res, next) => {
//     const {status} = err;
//     res.status(status).send("Error!") 
//     // Error Code will still be "403" if we navigate to "./secret" because that's what our "App Error" has set it to.
// })

/*
 Note that error status codes exist only for errors caused by "interactions in HTTP". Errors such as "syntax" or "reference" errors do not have built-in error codes so we cannot use the above error handler to "catch" those errors. If you want to still use our custom error handler in cases of "reference" or "syntax" errors, set a default "status".

*/

app.get("/error", (req, res) => {
    noSuchFunction()
})

app.use((err, req, res, next) => {
    const {status = 400} = err;
    const {message = "Something went wrong"} = err; // We can also add the built-in error message into our error handler
    // res.status(status).send("Error!") 
    res.status(status).send(message) 
    // Error Code will be "403" if we navigate to "./secret" but it will be "400" if we navigate to "./error" due to there being a reference error
})



app.listen(3001, () => {
    console.log('App is running on localhost:3001')
})