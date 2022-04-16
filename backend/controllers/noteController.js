const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const User = require('../models/userModel')

// Get Goals
//routes GET /api/notes
//access private
const getNotes = asyncHandler(async (req, res) => {
 const notes = await Note.find({user: req.user.id})
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
   text: req.body.text,
   user: req.user.id,
 })
  res.status(200).json(note);
});

// Update Goal
//routes PUT /api/:id
//access private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  //check for user
  if(!note) {
    res.status(400)
    throw new Error('Note not found')
  }

  //make sure loggin user matches the note
  if(!req.user) {
    res.status(401) 
    throw new Error('User not found')
  }

  if(note.user.toString() !=req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
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

    //check for user
    if(!note) {
      res.status(400)
      throw new Error('Note not found')
    }
  
    //make sure loggin user matches the note
    if(!req.user) {
      res.status(401) 
      throw new Error('User not found')
    }
  
    if(note.user.toString() !=req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
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
