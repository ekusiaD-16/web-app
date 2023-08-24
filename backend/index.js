const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const FakeDb = require('./fake-db')

mongoose.connect(config.DB_URI).then(
    () => {
        const fakeDb = new FakeDb()
        fakeDb.initDb()
    }
)

const app = express()

app.get('/import', function(req, res) {
    res.json({'success': true})
})

app.listen('3001', function() {
    console.log('I am running!')
})