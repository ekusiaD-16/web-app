const Image = require('./model/image')

class Db {

    constructor() {
        this.images = [
            {
                name : 'testA',
                path : 'testA.png',
                state : 'raw'
            },
            {
                name : 'testB',
                path : 'testB.png',
                state : 'processed'
            },
            {
                name : 'testC',
                path : 'testC.png',
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

module.exports = Db