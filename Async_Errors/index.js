/*
Handling errors generated from asynchronous functions is more complicated than synchronous functions.

We first create our custom "error class" in "AppError.js" and then "require" it. We will also import our custom "error handler"
*/

// --- CODE TRANSITION: 04c to 04d ---

// --- CODE TRANSITION: 04d to 04e ---

/*
If we are using async functions, we can also use the standard way of handling errors: "try" and "catch."
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


// ***&&& EXPRESS ROUTES &&&***

app.get('/products', async (req, res, next) => {
    try { // If Mongoose generates an error on this route (e.g. a product is created without a name, we will catch the error.)
        const { category } = req.query;
        if (category) {
            const products = await Product.find({ category })
            res.render('products/index', { products, category })
        } else {
            const products = await Product.find({})
            res.render('products/index', { products, category: 'All' })
        }
    } catch(e) { // This sends the error to our custom error handler.
    next(e)
    }
})


app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})


app.post('/products', async (req, res, next) => {
    try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
    } catch(e) {
    next(e) 
    }
})

app.get('/products/:id', async (req, res, next) => {
    try {
    // This "try-catch" handles errors generated when Mongoose "malfunctions" whereas in interior "AppError" handles errors generated when Mongoose is functioning "correctly" 
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        // return next(new AppError("Product Not Found", 404));
         throw new AppError("Product Not Found", 404);
         // Since we have a "try-catch" setup for this route, we are able to "throw" errors instead of passing them to "next" the way we had to in previous circumstances. That is, because we have a "catch" set up, its all right to "throw" errors.
    }
    res.render('products/show', { product })
    } catch(e) {
        next(e)
    }
})

app.get('/products/:id/edit', async (req, res, next) => {
    try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product Not Found", 404);
        }
    res.render('products/edit', { product, categories })
    } catch(e) {
        next(e)
    }
})


app.put('/products/:id', async (req, res, next) => {
    try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
    } catch(e) {
        next(e)
    }
})


app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})


app.listen(3002, () => {
    console.log("APP IS LISTENING ON PORT 3002!")
})