const mongoose = require('mongoose')
const validator = require('validator')
const Task = mongoose.model('Task', {
    task: {
        type: String,
        required: true,
        trim: true

    },
    desc: {
        type: Number

    },
    compl: { 
        type: Boolean,
        default: false
        
    }
})
module.exports = Task