const express = require('express')
const router = express.Router()
const Image = require('../model/image')

router.get('', function(req, res) {
    Image.find({}).then(
        (foundImages) => {
            res.json(foundImages)
        }
    )
    .catch((err) => {
        console.log(err)
    })
})

router.get('/:imageId', function(req, res) {
    const imageId = req.params.imageId
    Image.findById(imageId).then(
        (foundImage) => {
            res.json(foundImage)
        }
    )
    .catch((err) => {
        console.log(err)
        res.status(422).send({errors : [{title : 'Image error', detail : 'Image not found'}]})
    })
})

module.exports = router