const express  = require('express');
const mongoose = require('mongoose');
const Sneaker  = require('./models/sneaker');
const app      = express();

// Config
const PORT      = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sneakerDB';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongoose connected!'))
.catch(err => console.error('Mongoose connection error:', err));

// Middleware & view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Redirect root to collection
app.get('/', (req, res) => {
  res.redirect('/collection');
});

// Show form to add a new sneaker
app.get('/form', (req, res) => {
  res.render('pages/form');
});

// Display collection
app.get('/collection', async (req, res) => {
  try {
    const sneakers = await Sneaker.find({});
    res.render('pages/collection', { sneakers });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Handle form POST to add a sneaker
app.post('/sneaker', async (req, res) => {
  try {
    const newSneaker = new Sneaker(req.body.sneaker);
    await newSneaker.save();
    res.render('pages/success', { name: newSneaker.name });
  } catch (err) {
    res.status(500).send(err);
  }
});

// JSON endpoint: list or filter by maxPrice
app.get('/sneakers', async (req, res) => {
  try {
    const filter = {};
    if (req.query.maxPrice) {
      filter.price = { $lte: Number(req.query.maxPrice) };
    }
    const results = await Sneaker.find(filter).sort({ price: 1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Show AJAX query page
app.get('/query', (req, res) => {
  res.render('pages/query');
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} !`);
});
