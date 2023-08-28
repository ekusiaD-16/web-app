const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

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

const appPath = path.join( __dirname, '..', 'frontend', 'dist', 'frontend')
app.use(express.static(appPath))
app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
})

const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
    console.log('I am running!')
})