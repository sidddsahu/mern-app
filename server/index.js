// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS in dev only (or always if you want)
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// MongoDB connection
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_example';
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Simple model
const Note = require('./models/Note');

// Routes
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Serve client in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
