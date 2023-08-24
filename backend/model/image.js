const mongoose = require('mongoose')

// const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const imageSchema = mongoose.Schema({
    // id  : ObjectId,
    name : { type : String, required : true }, 
    state : String
})

module.exports = mongoose.model('Image', imageSchema)