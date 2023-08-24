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

    async initDb() {
        await this.cleanDb()
        this.pushImagesToDb()
    }

    async cleanDb() {
        await Image.deleteMany({})
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