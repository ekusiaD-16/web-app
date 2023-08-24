const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const model = require('./model/image')

mongoose.connect(config.DB_URI)

const app = express()

app.get('/import', function(req, res) {
    res.json({'success': true})
})

app.listen('3001', function() {
    console.log('I am running!')
})