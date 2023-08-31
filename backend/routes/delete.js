const express = require('express')
const router = express.Router()
const Image = require('../model/image')
const Error = require('../error')
const mongoose = require('mongoose')

router.get('', function(req, res) {
    res.json({'delete' : true})
})

router.post('', function(req, res) {
    const imageId = req.body.imageId || ''
    if(!imageId) {
        const deleteError = new Error.DeleteError('imageId is none', err)
        res.status(500).send({ name : deleteError.name , message : deleteError.message })
    }
    Image.findById(imageId).then(
        (foundImage) => {
            if(!foundImage) {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
            }
            // 削除処理
            Image.deleteOne({ _id : imageId }).then(
                (data) => { res.json(data) },
                (err)  => { throw new Error.DeleteError('can not delete. target id:'+imageId, err) }
            )
        },
        (err) => {
            if(err instanceof mongoose.Error) {
                throw new Error.DbError('Can not connect DB', err)
            }
            throw new Error.ImageNotFoundError('Image not found target id:'+imageId, err)
        }
    )
    .catch((err) => {
        if(err instanceof Error.ImageNotFoundError) {
            console.error(err)
            res.status(404).send({ name : err.name , message : err.message })
        }
        else if(err instanceof Error.DeleteError) {
            console.error(err)
            res.status(500).send({ name : err.name , message : err.message })
        }
        else {
            console.error(err)
            const dbError = new Error.DbError('Can not connect DB', err)
            console.error(dbError)
            res.status(500).send({ name : dbError.name , message : dbError.message })
        }
    })
    
})

module.exports = router