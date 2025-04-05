const express  = require('express');
const mongoose = require('mongoose');
const Sneaker  = require('./models/sneaker');
const app      = express();

// 1) Config from env (compose) or fallback to local dev
const PORT        = process.env.PORT || 3000;
const MONGO_URI   = process.env.MONGODB_URI || 'mongodb://localhost:27017/sneakerDB';

// 2) Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongoose connected!'))
.catch(err => console.error('Mongoose connection error:', err));

// 3) Middleware & view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4) Routes

// Health check
app.get('/', (req, res) => {
  res.send('Sneaker collection server is live!');
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

// Add a new sneaker
app.post('/sneaker', async (req, res) => {
  try {
    const newSneaker = new Sneaker(req.body.sneaker);
    await newSneaker.save();
    res.render('pages/success', { name: newSneaker.name });
  } catch (err) {
    res.status(500).send(err);
  }
});

// 5) Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} !`);
});
