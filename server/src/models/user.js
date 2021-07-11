const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true


    },
    password:{
        type: String,
        required: true,
        trim: true,
       minlength: 7,
       validate(value){
           if (value.toLowerCase().includes('password')) {
               throw new Error('Pasword cannot contain "password" ')
               
           }

       }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
                
            }

        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be positve number')
                
            }

        }

    }
})
userSchema.pre('save', async function(next) {
    const user = this
    console.log('just before saving')
    next()
})
const User = mongoose.model('User',userSchema)

module.exports = User