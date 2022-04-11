const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
// Get Goals
//routes GET /api/notes
//access private
const getNotes = asyncHandler(async (req, res) => {
 const notes = await Note.find()
  res.status(200).json(notes);
});

// Set Goals
//routes POST /api/notes
//access private
const setNotes = asyncHandler(async (req, res) => {
 if(!req.body.text) {
   res.status(400)
   throw new Error('Please add a text field')
 }
 const note = await Note.create({
   text: req.body.text
 })
  res.status(200).json(note);
});

// Update Goal
//routes PUT /api/:id
//access private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if(!note) {
    res.status(400)
    throw new Error('Note not found')
  }

  const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updateNote);
});

// Delete Goals
//routes Delete /api/:id
//access private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if(!note) {
    res.status(400)
    throw new Error('Note not found')
  }
  await note.remove()
  res.status(200).json({ id: req.params.id});
});

module.exports = {
  getNotes,
  setNotes,
  updateNote,
  deleteNote,
};
