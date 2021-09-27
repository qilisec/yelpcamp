/*
Handling errors generated from asynchronous functions is more complicated than synchronous functions.

We first create our custom "error class" in "AppError.js" and then "require" it. We will also import our custom "error handler"
*/

// ***&&& MODULE SETUP &&&***

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError'); // This is our custom error class


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


app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})


app.get('/products/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
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


