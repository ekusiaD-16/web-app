const express = require('express')
const router = express.Router()
const Image = require('../model/image')


router.get('', function(req, res) {
    res.json({'register' : true})
})

router.post('', function(req, res) {
    const newImage = new Image(req.body)
    Image.create(newImage).then( () => {
        res.json({ 'created' : true })
    })
    .catch((err) => {
        res.json({ 'error' : 'alredy exist' })
        console.log(err)
    })
    
})

module.exports = router