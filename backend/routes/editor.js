const express = require('express')
const router = express.Router()
const Image = require('../model/image')


router.get('', function(req, res) {
    res.json({'editor' : true})
})

router.post('/zoom', function(req, res, next) {
    if(req.body) {
        //DBから該当Imageを取得
        const imageId = req.body.imageId
        const zoomRate = req.body.zoomRate
        Image.findById(imageId).then( (image) => {
            // zoom処理を実行
            const processedImage = zoom(image,zoomRate)

            // 処理後ImageをDBへ追加
            const result = addImageToDb(processedImage)
            res.json(processedImage)
        } )
        .catch( (err) => {
            console.error(err)
            next(err)
        } )
    }
    else { next({error: 'request is null'})}
})

function zoom(image, zoomRate, newName) {
    // TODO OpenCV.js で処理
    const base = newName || image.name + '_' + 'zoom' + '_' + zoomRate

    const _name = base
    const _path = base + '.' + image.path.split('.').pop()
    const _state= 'processed'
    const _src  = image.src

    processedImage = new Image({
        name : _name,
        path : _path,
        state: _state,
        src  : _src
    })

    return processedImage
}

function addImageToDb(processedImage) {
    Image.create(processedImage).then( () => {
        return true
    })
    .catch((err) => {
        throw err
    })
}

module.exports = router