const mongoose = require('mongoose');

const noteSchema  = mongoose.Schema({
    text: {
        type: String,
        require: [true, 'Please add a text value']     
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Note', noteSchema)