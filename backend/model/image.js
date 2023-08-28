const mongoose = require('mongoose')

// const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const imageSchema = mongoose.Schema({
    // id  : ObjectId,
    name : { type : String, required : true }, 
    path : String,
    state : String,

})

module.exports = mongoose.model('Image', imageSchema)