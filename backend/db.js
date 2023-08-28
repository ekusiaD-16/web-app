const Image = require('./model/image')

class Db {

    constructor() {
        this.images = [
            {
                name : 'testA',
                path : 'testA.png',
                state : 'raw',
                src  : 'AAA',
            },
            {
                name : 'testB',
                path : 'testB.png',
                state : 'processed',
                src  : 'BBBBBBBB',
            },
            {
                name : 'testC',
                path : 'testC.png',
                state : 'processed',
                src  : 'CCCCCCCCCCCCC',
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

module.exports = Db