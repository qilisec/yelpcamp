const Campground = require ("../models/models.js"); // ".." means "go back one directory"
const cities = require("./cities.js"); // Note that "cities" is an array
const {places, descriptors} = require("./seedHelpers"); // This imports our "places" and "descriptors" from seedHelpers.js using "destructuring syntax". Note that "places" and "descriptors" are both arrays.


const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection; // Unnecessary; just for speed
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: "purple field"}); // Use to check to see the function works to save new entries into our database.
    // await c.save();
    for (let i=0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randArrayEntry = array => array[Math.floor(Math.random() * array.length)]; // Unnecessary; just for speed.
        const campCityState = new Campground({
            title: `${randArrayEntry(descriptors)} ${randArrayEntry(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
            })
            await campCityState.save()
        }
        // await campCityState.save() // Careless Mistake: this line needs to be in the loop because the constant "campCityState" is scoped to the loop only.
    }


seedDB().then(() => {
    mongoose.connection.close();
})
// Since seedDB is an async function, we can append an ".then" operation to it. We will close the connection that was used to send the seed campgrounds to the database after the operation has been completed because we don't want to keep the connection open for no reason.