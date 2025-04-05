var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port     = process.env.PORT || 3000;

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/sneakerDB';

// Connect to the local MongoDB database "sneakerDB"
async function main() {
  await mongoose.connect('mongodb://localhost:27017/sneakerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
main()
  .then(() => console.log("Mongoose connected!"))
  .catch(err => console.log(err));

// Import the sneaker model
var sneakerModel = require("./models/sneaker");

// Set EJS as the view engine and enable body parsing middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route to confirm server is live
app.get("/", function(req, res) {
  res.send("Sneaker collection server is live!");
});

// Route to display the form for adding a new sneaker
app.get("/form", function(req, res) {
  res.render("pages/form");
});

// Route to display all sneakers in the collection
app.get("/collection", function(req, res) {
  sneakerModel.listAllSneakers()
    .then(function(sneakers) {
      console.log("Sneakers retrieved:", sneakers);
      res.render("pages/collection", { sneakers: sneakers });
    })
    .catch(err => res.status(500).send(err));
});

// POST route to add a new sneaker to the database
app.post('/sneaker', async (req, res) => {
    try {
      console.log('Sneaker:', req.body.sneaker);
      const newSneaker = new sneakerModel(req.body.sneaker);
      await newSneaker.save();
      // show success page, passing the sneaker name
      res.render('pages/success', { name: newSneaker.name });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Start the server on port 3000
app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});
