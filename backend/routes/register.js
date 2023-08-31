const express = require('express')
const router = express.Router()
const Image = require('../model/image')
const Error = require('../error')

router.get('', function(req, res) {
    res.json({'register' : true})
})

router.post('', function(req, res) {
    const newImage = new Image(req.body)
    Image.create(newImage).then( 
        (data) => { res.json({ 'created' : true }) },
        (err)  => { 
            console.error(err)
            throw new Error.RegisterError('Can not register to DB', err)
        }
    )
    .catch((err) => {
        if(err instanceof Error.RegisterError) {
            res.status(500).send({ name : err.name , message : err.message })
        }
        else {
            const dbError = new Error.DbError('Can not connect DB', err)
            res.status(500).send({ name : dbError.name , message : dbError.message })
        }
    })
    
})

module.exports = router