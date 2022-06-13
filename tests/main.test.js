const productController = require('../controllers/productListController');
const request = require('supertest');
const app = require('../app')

describe('register', () => {
    it('return 200', async() => {
        const res = await request(app).get('/back');

        expect(res.redirect('..'))
    })
})
