/*
Start by initializing NPM using "npm init -y". This creates your "package.json"

We then install our "base": Express, EJS, and Mongoose using "npm i express ejs mongoose"

After installing, we then perform the general setup of our Express module.
*/
const express = require("express");
const app = express();


// app.get ("/", (req, res) => {
//     res.send("Hello from YelpCamp")
// })
app.listen(3000, () => {
    console.log("serving on port 3000")
})

/*
We then perform the general setup on our EJS module. We create a views folder, create a "test" page, and then set our "views" directory. In order to do so, we must first require "path" functionality from Express.
*/

const path = require("path")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get ("/", (req, res) => {
    res.render("test")
})

