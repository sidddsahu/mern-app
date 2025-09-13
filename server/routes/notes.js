// server/routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes
router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// POST /api/notes
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.status(201).json(note);
});

// PUT /api/notes/:id
router.put('/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
