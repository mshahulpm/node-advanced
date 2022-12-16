const { Schema, default: mongoose } = require("mongoose");


const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User 