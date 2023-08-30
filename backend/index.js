const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const config = require('./config/dev')
const Db = require('./db')
const Error = require('./error')

const registerRoutes = require('./routes/register')
const imagesRoutes = require('./routes/images')
const editorRoutes = require('./routes/editor')

mongoose.connect(config.DB_URI).then(
    (data) => {
        const db = new Db()
        db.initDb()
    },
    (err) => {
        const dbError =  new Error.DbError('Can not connect DB', err)
        console.error(dbError)
    }
)

const app = express()

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))

app.use('/api/v1/register', registerRoutes)
app.use('/api/v1/images', imagesRoutes)
app.use('/api/v1/editor', editorRoutes)

const appPath = path.join( __dirname, '..', 'frontend', 'dist', 'frontend')
app.use(express.static(appPath))
app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
})

const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
    console.log('I am running!')
})