const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    name : { type : String, required : true, unique : true }, 
    path : String,
    state : String,
    src  : String,
})

module.exports = mongoose.model('Image', imageSchema)