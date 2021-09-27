// --- CODE TRANSITION: 03 to 04a ---

/*
There are many types of errors. Some are due to improperly written code (e.g. reference errors) but others are due to "unexpected" interactions between the various moving parts of your web app that end to moving data between components of your application in ways that they were not expecting or equipped to handle. This could be due to things like "unaccounted for" inputs such as empty strings or something like an API that's "down" that isn't providing your app with the data it expects.

Express has a built-in error handler. We can also create our own errors that are thrown in scenarios of our own choosing using "throw new Error"
*/

// ***&&& MODULE SETUP &&&***
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})


// ***&&& EXPRESS ROUTES &&&***

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new Error("Password needed")
}


// app.use('/dogs', (req, res, next) => {
//     console.log("I LOVE DOGS!!")
//     next();
// })

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    console.log("Dash")
    res.send('HOME PAGE!')
})

// app.use((req, res) => {
//     res.status(404).send('NOT FOUND!')
// })

// app.listen(3001, () => {
//     console.log('App is running on localhost:3001')
// })

/*
In addition, we can create own own error handlers that will supercede the built-in error handler. These are functions that take the form:

function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
}

In order for this function to become our new Express Error handler, we pass this function into Express using "app.use".

This "app.use" should be placed last in your "app.use" routes. 

Also, if we then want the built-in error handler to run after our custom error handler, we can' use the code ("next(err"))
*/

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.use((err, req, res, next) => {
    console.log("**********")
    console.log("***ERROR**")
    console.log("**********")
    res.status(500).send("Oh Boy, we have an error")
    next(err)
})

app.listen(3001, () => {
    console.log('App is running on localhost:3001')
})