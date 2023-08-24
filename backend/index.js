const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const Db = require('./db')

const importRoutes = require('./routes/import')
const imagesRoutes = require('./routes/images')

mongoose.connect(config.DB_URI).then(
    () => {
        const db = new Db()
        db.initDb()
    }
)

const app = express()


app.use('/api/v1/import', importRoutes)
app.use('/api/v1/images', imagesRoutes)


app.listen('3001', function() {
    console.log('I am running!')
})