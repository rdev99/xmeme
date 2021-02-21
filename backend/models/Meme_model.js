const mongoose = require('mongoose')

//Meme Schema
const memeSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    likes : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Meme',memeSchema);