const express = require('express')
const router = express.Router()
const Image = require('../model/image')
const Error = require('../error')
const fetch = require('node-fetch')

router.get('', function(req, res) {
    res.json({'editor' : true})
})

router.post('/zoom', function(req, res) {
    if(req.body) {
        //DBから該当Imageを取得
        const imageId = req.body.imageId
        const zoomRate = req.body.zoomRate
        Image.findById(imageId).then(
            (foundImage) => {
                if(!foundImage) {
                    throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
                }
                // zoom処理を実行
                const processedImage = zoom(foundImage,zoomRate)

                // 処理後ImageをDBへ追加
                const result = addImageToDb(processedImage)
                // 処理後Imageをresponseとして返す
                res.json(processedImage)
            },
            (err) => {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId, err)
            }
        )
        .catch( (err) => {
            console.error(err)
            if(err instanceof Error.ImageNotFoundError) {
                res.status(404).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.IllegalImageError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.RegisterError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.EditError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            else {
                res.status(500).send({ name : 'UnknownError' , message : 'samething happen' })
            }
        } )
    }
    // request === null
    else {
        const editError = new Error.EditError('request is null')
        res.status(500).send({ name : editError.name , message : editError.message })
    }
})

router.post('/toGray', function(req, res) {
    if(!req) {
        const editError = new Error.EditError('request is null')
        res.status(500).send({ name : editError.name , message : editError.message })
    }
    else {
        //DBから該当Imageを取得
        const imageId = req.body.imageId
        Image.findById(imageId).then(
            (foundImage) => {
                if(!foundImage) {
                    throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
                }
                else {
                    // toGray処理を実行
                    const url = 'http://127.0.0.1:5000/process/toGray'
                    const data = JSON.stringify( { 'image' : foundImage , 'params' : {} })
                    fetch(url, {
                        method:'POST',
                        body:data,
                        headers:{"Content-Type": "application/json"}
                    }
                    ).then(
                        (response) => {
                            response.json().then(
                                (data) => {
                                    console.log('get response')
                                    // 処理後ImageをDBへ追加
                                    const result = addImageToDb(data.image)
                                    res.json({'result':result})
                                },
                                (err) => {
                                    console.error('response.json() error')
                                }
                            )
                        },
                        (err) => {
                            console.error(err)
                            const editError = new Error.EditError('request is null')
                            res.status(500).send({ name : editError.name , message : editError.message })
                        }
                    )
                }
            },
            (err) => {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId, err)
            },
        )
        .catch( (err) => {
            console.error(err)
            if(err instanceof Error.ImageNotFoundError) {
                res.status(404).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.IllegalImageError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.RegisterError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.EditError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            else {
                res.status(500).send({ name : 'UnknownError' , message : 'samething happen' })
            }
        } )
    }}
)

router.post('/resize', function(req, res) {
    if(!req) {
        const editError = new Error.EditError('request is null')
        res.status(500).send({ name : editError.name , message : editError.message })
    }
    else {
        //DBから該当Imageを取得
        const imageId = req.body.imageId
        const resizeRate = req.body.resizeRate
        Image.findById(imageId).then(
            (foundImage) => {
                if(!foundImage) {
                    throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
                }
                else {
                    // toGray処理を実行
                    const url = 'http://127.0.0.1:5000/process/resize'
                    const data = JSON.stringify( { 'image' : foundImage , 'params' : { 'resizeRate':resizeRate } })
                    fetch(url, {
                        method:'POST',
                        body:data,
                        headers:{"Content-Type": "application/json"}
                    }
                    ).then(
                        (response) => {
                            response.json().then(
                                (data) => {
                                    console.log('get response')
                                    // 処理後ImageをDBへ追加
                                    const result = addImageToDb(data.image)
                                    res.json({'result':result})
                                },
                                (err) => {
                                    console.error('response.json() error')
                                }
                            )
                        },
                        (err) => {
                            console.error(err)
                            const editError = new Error.EditError('request is null')
                            res.status(500).send({ name : editError.name , message : editError.message })
                        }
                    )
                }
            },
            (err) => {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId, err)
            },
        )
        .catch( (err) => {
            console.error(err)
            if(err instanceof Error.ImageNotFoundError) {
                res.status(404).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.IllegalImageError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.RegisterError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.EditError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            else {
                res.status(500).send({ name : 'UnknownError' , message : 'samething happen' })
            }
        } )
    }}
)

router.post('/rotate', function(req, res) {
    if(!req) {
        const editError = new Error.EditError('request is null')
        res.status(500).send({ name : editError.name , message : editError.message })
    }
    else {
        //DBから該当Imageを取得
        const imageId = req.body.imageId
        const angle = req.body.angle
        Image.findById(imageId).then(
            (foundImage) => {
                if(!foundImage) {
                    throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
                }
                else {
                    // toGray処理を実行
                    const url = 'http://127.0.0.1:5000/process/rotate'
                    const data = JSON.stringify( { 'image' : foundImage , 'params' : { 'angle':angle } })
                    fetch(url, {
                        method:'POST',
                        body:data,
                        headers:{"Content-Type": "application/json"}
                    }
                    ).then(
                        (response) => {
                            response.json().then(
                                (data) => {
                                    console.log('get response')
                                    // 処理後ImageをDBへ追加
                                    const result = addImageToDb(data.image)
                                    res.json({'result':result})
                                },
                                (err) => {
                                    console.error('response.json() error')
                                }
                            )
                        },
                        (err) => {
                            console.error(err)
                            const editError = new Error.EditError('request is null')
                            res.status(500).send({ name : editError.name , message : editError.message })
                        }
                    )
                }
            },
            (err) => {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId, err)
            },
        )
        .catch( (err) => {
            console.error(err)
            if(err instanceof Error.ImageNotFoundError) {
                res.status(404).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.IllegalImageError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.RegisterError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.EditError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            else {
                res.status(500).send({ name : 'UnknownError' , message : 'samething happen' })
            }
        } )
    }}
)

router.post('/trim', function(req, res) {
    if(!req) {
        const editError = new Error.EditError('request is null')
        res.status(500).send({ name : editError.name , message : editError.message })
    }
    else {
        //DBから該当Imageを取得
        const imageId = req.body.imageId
        const pos = req.body.pos
        console.log('POS:',pos)
        Image.findById(imageId).then(
            (foundImage) => {
                if(!foundImage) {
                    throw new Error.ImageNotFoundError('Image not found target id:'+imageId)
                }
                else {
                    // toGray処理を実行
                    const url = 'http://127.0.0.1:5000/process/trim'
                    const data = JSON.stringify( { 'image' : foundImage , 'params' : { 'pos':pos } })
                    fetch(url, {
                        method:'POST',
                        body:data,
                        headers:{"Content-Type": "application/json"}
                    }
                    ).then(
                        (response) => {
                            response.json().then(
                                (data) => {
                                    console.log('get response')
                                    // 処理後ImageをDBへ追加
                                    const result = addImageToDb(data.image)
                                    res.json({'result':result})
                                },
                                (err) => {
                                    console.error('response.json() error')
                                }
                            )
                        },
                        (err) => {
                            console.error(err)
                            const editError = new Error.EditError('request is null')
                            res.status(500).send({ name : editError.name , message : editError.message })
                        }
                    )
                }
            },
            (err) => {
                throw new Error.ImageNotFoundError('Image not found target id:'+imageId, err)
            },
        )
        .catch( (err) => {
            console.error(err)
            if(err instanceof Error.ImageNotFoundError) {
                res.status(404).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.IllegalImageError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.RegisterError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            if(err instanceof Error.EditError) {
                res.status(500).send({ name : err.name , message : err.message })
            }
            else {
                res.status(500).send({ name : 'UnknownError' , message : 'samething happen' })
            }
        } )
    }}
)

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

function addImageToDb(image) {
    Image.create(image).then(
        (data) => { return true },
        (err) => { throw new Error.RegisterError('Can not register to DB', err) }
    )
    .catch((err) => {
        throw err
    })
}

module.exports = router