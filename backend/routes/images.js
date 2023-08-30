const express = require('express')
const router = express.Router()
const Image = require('../model/image')
const Error = require('../error')

router.get('', function(req, res) {
    Image.find({}).then(
        (foundImages) => {
            res.json(foundImages)
        }
    )
    .catch((err) => {
        const dbError = new Error.DbError('Can not connect DB', err)
        console.error(dbError)
        res.status(500).send({ name : dbError.name , message : dbError.message })
    })
})

router.get('/:imageId', function(req, res) {
    const imageId = req.params.imageId
    Image.findById(imageId).then(
        (foundImage) => {
            if(!foundImage) {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
            }
            res.json(foundImage)
        }
    )
    .catch((err) => {
        if(err instanceof Error.ImageNotFoundError) {
            console.error(err)
            res.status(404).send({ name : err.name , message : err.message })
        }
        else {
            const dbError = new Error.DbError('Can not connect DB', err)
            console.error(dbError)
            res.status(500).send({ name : dbError.name , message : dbError.message })
        }
    })
})

module.exports = router