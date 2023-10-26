const requrest = require('supertest')
const app = require('../index')
const Image = require('../model/image')
jest.mock('../model/image')
const Db = require('../db')
jest.mock('../db')

describe('API server', () => {

    beforeEach( () => {
        const agent = requrest.agent(app)
    })
    
    describe('GET /', () => {
        test('GET / check running', async () => {
            const response = await requrest(app).get('/')
            expect(response.status).toBe(200)
        })
    })

    describe('GET /api/v1/images/', () => {
        test('GET /api/v1/images/', async () => {
            const expected = [ {_id:'aaa', name:'testA', status:0}, {_id:'bbb',name:'testA_toGray', status:1} ]
            Image.find.mockResolvedValue(expected)
            const response = await requrest(app).get('/api/v1/images/')
            expect(response.status).toBe(200)
            expect(response.body).toEqual(expected)
        })

        test('GET /api/v1/images/imageId', async () => {
            const imageId = 'aaa'
            const expected = [ {_id:'aaa', name:'testA', status:0}, {_id:'bbb',name:'testA_toGray', status:1} ]
            Image.findById.mockResolvedValue(expected[0])
            const response = await requrest(app).get('/api/v1/images/' + imageId)
            expect(response.status).toBe(200)
            expect(response.body).toEqual(expected[0])
        })
    })

    xdescribe('GET /api/v1/', () => {

    })

})
