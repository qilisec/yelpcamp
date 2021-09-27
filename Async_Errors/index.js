/*
Handling errors generated from asynchronous functions is more complicated than synchronous functions.

We first create our custom "error class" in "AppError.js" and then "require" it. We will also import our custom "error handler"
*/

// --- CODE TRANSITION: 04c to 04d ---

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
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})


app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})


app.post('/products', async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})


/*
&&&&&&&&& 
If we navigate to the "details" page of a product that doesn't exist (i.e. the wrong ID is inputted), we receive an error. Normally, we can attempt to "catch" that error with our custom error class and handler, as in:
&&&&&&&&& 
*/

// app.get('/products/:id', async (req, res, next) => {
//     const { id } = req.params;
//     const product = await Product.findById(id)
//     if (!product) { // Code added to "catch" the error
//         throw new AppError("Product Not Found", 404)
//     }
//     res.render('products/show', { product })
// })

/*
&&&&&&&&& 
However, in this case, the error is not successfully caught (i.e. We do not see the page denoted by our error handler). This is because, for async functions, in order to "activate" our error handler, all errors must be passed to a "next" function.

As with "app.use", "app.get" methods can also have a "next" function as a parameter. As with "app.use", when "next()"  is invoked in a "app.get" route, the "next" call back is executed. However, if next() is invoked with an argument, Express determines that the "next" function will be the error handler.
&&&&&&&&& 
*/

app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        return next(new AppError("Product Not Found", 404));
        }
        // For some reason, the incorrect "id" has to be the same character length as a "correct" id. Otherwise, the website continues to "spin" out.
    res.render('products/show', { product })
    // If we do not include "return" in the "next" statement, then EJS will still attempt to "res.render" "products/show" based on our erroneous ID, which will not work. 
})

/*
&&&&&&&&& 
We can handle an error with editing a product in the same manner.
&&&&&&&&& 
*/

app.get('/products/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError("Product Not Found", 404));
        }
    res.render('products/edit', { product, categories })
})


app.put('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})


app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});


/* 
&&&&&&&&& 
NOTE: This is the custom error handler that we created.
&&&&&&&&&
*/

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})


app.listen(3002, () => {
    console.log("APP IS LISTENING ON PORT 3002!")
})


