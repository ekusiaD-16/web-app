const express = require('express')
const router = express.Router()
const Image = require('../model/image')


router.get('', function(req, res) {
    res.json({'/import' : true})
})

router.post('', function(req, res) {
    const newImage = new Image(req.body)
    Image.create(newImage)
    res.json({ 'created' : true })
})

module.exports = router