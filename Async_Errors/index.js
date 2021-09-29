/*
Handling errors generated from asynchronous functions is more complicated than synchronous functions.

We first create our custom "error class" in "AppError.js" and then "require" it. We will also import our custom "error handler"
*/

// --- CODE TRANSITION: 04c to 04d ---

// --- CODE TRANSITION: 04d to 04e ---

/*
If we are using async functions, we can also use the standard way of handling errors: "try" and "catch."
*/

// --- CODE TRANSITION: 04e to 04f ---

/*
Since we will be using many async functions when creating routes in Express, it will be very tedious to set up "try-catch" error handling for each route. In order to cut down on the tedium, we can create a function that we can pass our anonymous "async (req, res)" functions into which will wrap those "async (req, res)" functions with a "try-catch".

If the asynchronous function generates an error, the error is "passed" up to the "parent" function and since the "parent" function sets up a "try-catch", the error will thus be caught.

We will call this "parent" function "wrapAsync" and it is defined as:
*/

// function wrapAsync(fn) {
//     return function (req, res, next) {
//         fn(req, res, next).catch(e => next(e))
//         // I think this function uses ".catch" because it's not in "async-await" syntax but rather just dealing with "promises"
//     }
// }

/*
Now that we have defined this function "wrapAsync", we "enclose" every "async (req, res, next)" function in our routes with "wrapAsync" and remove the existing "try-catch" setups
*/


// --- CODE TRANSITION: 04f to 04g ---

/*
Mongoose has many errors. One way in which Mongoose labels its errors are through the "names" that it assigns its errors. These names can be "acquired" using Express middleware.
*/

// ***&&& MODULE SETUP &&&***

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError');


const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
        // I think this function uses ".catch" because it's not in "async-await" syntax but rather just dealing with "promises"
    }
}

// ***&&& EXPRESS ROUTES &&&***

app.get('/products', wrapAsync(async (req, res, next) => {
        const { category } = req.query;
        if (category) {
            const products = await Product.find({ category })
            res.render('products/index', { products, category })
        } else {
            const products = await Product.find({})
            res.render('products/index', { products, category: 'All' })
        }
}))


app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})


app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        throw new AppError("Product Not Found", 404);
    }
    res.render('products/show', { product })
}))

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product Not Found", 404);
        }
    res.render('products/edit', { product, categories })
}))


app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
}))


app.delete('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
}));

// app.use((err, req, res, next) => {
//     console.log(err.name); // This middleware "announces" the name of the "error"
//     next(err) // After "announcing" the error name, this middleware then passes the error off to our actual custom error handler.
// })

/* 
&&&&&&&&&&&&&&&&&&&&&&&&&
The above middleware shows us that when we try to create a new product without providing a product "name" or "quantity", Mongoose generates a "ValidationError". This is because we have "required" that all new products must have those properties filled out. 

We can create custom behavior based on error names.
&&&&&&&&&&&&&&&&&&&&&&&&&
*/

const handleValidationErr = err => {
    console.log(err);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") err = handleValidationErr(err)
    next(err)
})


app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})


app.listen(3002, () => {
    console.log("APP IS LISTENING ON PORT 3002!")
})

// --- Code Transition: 04 to 04.5 ---

/*
This concludes the section on Error Handling in Express. We will return to our work on the Yelp-Camp application.

*Go to ../app.js*
*/