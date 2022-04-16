import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../features/notes/noteSlice'
import {FaTrash} from 'react-icons/fa'

const NoteItem = ({note}) => {
    const dispatch = useDispatch()
  return (
    <div className='note'>
    <div>
        {new Date(note.createdAt).toLocaleString('en-US')}
    </div>
    <h2>{note.text}</h2>
    <button onClick={() => dispatch(deleteNote(note._id))} className='close' ><FaTrash /></button>
    </div>
  )
}

export default NoteItem