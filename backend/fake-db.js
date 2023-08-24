const Image = require('./model/image')

class FakeDb {

    constructor() {
        this.images = [
            {
                name : 'testA',
                state : 'raw'
            },
            {
                name : 'testB',
                state : 'processed'
            },
            {
                name : 'testC',
                state : 'processed'
            }
        ]
    }

    pushImagesToDb() {
        this.images.forEach(
            (image) => {
                const newImage = new Image(image)
                newImage.save()
            }
        )
    }

    seeDb() {
        this.pushImagesToDb()
    }

}

module.exports = FakeDb