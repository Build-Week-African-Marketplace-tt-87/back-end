const request = require('supertest')
const server = require('./api/server')
const db = require('./data/dbConfig')

const userA = { username: 'me', password: 'hello' }
const userB = { username: 'you', password: '12345' }
const userC = { username: 'friends', password: 'test123' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check jokes', () => {
  expect(true).not.toBe(false)
})

//Auth Routes
describe('server.js', () => {
  describe('auth endpoints', () => {
    describe('[POST] /api/auth/register', () => {
      beforeEach(async () => {
        await db('users').truncate()
      })
      it('adds a new user with a bcrypted password to the users table on success', async () => {
        await request(server).post('/api/auth/register').send(userA)
        const user = await db('users').first()
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('password')
        expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/)
        expect(user.username).toBe(userA.username)
      })
      it('responds with the new user with a bcrypted password on success', async () => {
        const { body } = await request(server).post('/api/auth/register').send(userA)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('username')
        expect(body).toHaveProperty('password')
        expect(body.password).toMatch(/^\$2[ayb]\$.{56}$/)
        expect(body.username).toBe(userA.username)
      })
      it('responds with a proper status code on success', async () => {
        const { status } = await request(server).post('/api/auth/register').send(userA)
        expect(status + '').toMatch(/2/)
      })
      it('responds with an error status code if username exists in users table', async () => {
        await request(server).post('/api/auth/register').send(userA)
        const { status } = await request(server).post('/api/auth/register').send(userA)
        expect(status + '').toMatch(/4|5/)
      })
      it('responds with "username taken" message if username exists in users table', async () => {
        await request(server).post('/api/auth/register').send(userA)
        const { body } = await request(server).post('/api/auth/register').send(userA)
        expect(JSON.stringify(body)).toEqual(expect.stringMatching(/taken/i))
      })
      it('responds with an error status code if username or password are not sent', async () => {
        let res = await request(server).post('/api/auth/register').send({})
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/register').send({ username: 'me' })
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/register').send({ password: 'hello' })
        expect(res.status + '').toMatch(/4|5/)
      })
      it('responds with "username and password required" message if either is not sent', async () => {
        let res = await request(server).post('/api/auth/register').send({})
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/register').send({ username: 'me' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/register').send({ password: 'hello' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
      })
    })
    describe('[POST] /api/auth/login', () => {
      beforeEach(async () => {
        await db('users').truncate()
        await request(server).post('/api/auth/register').send(userA)
      })
      it('responds with a proper status code on successful login', async () => {
        const res = await request(server).post('/api/auth/login').send(userA)
        expect(res.status).toBe(200)
      })
      it('responds with a welcome message and a token on successful login', async () => {
        const res = await request(server).post('/api/auth/login').send(userA)
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('token')
      })
      it('responds with an error status code if username or password are not sent', async () => {
        let res = await request(server).post('/api/auth/login').send({})
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/login').send({ username: 'me' })
        expect(res.status + '').toMatch(/4|5/)
        res = await request(server).post('/api/auth/login').send({ password: 'hello' })
        expect(res.status + '').toMatch(/4|5/)
      })
      it('responds with "username and password required" message if either is not sent', async () => {
        let res = await request(server).post('/api/auth/login').send({})
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/login').send({ username: 'me' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
        res = await request(server).post('/api/auth/login').send({ password: 'hello' })
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/required/i))
      }, 500)
      it('responds with a proper status code on non-existing username', async () => {
        const res = await request(server).post('/api/auth/login').send(userB)
        expect(res.status + '').toMatch(/4|5/)
      }, 500)
      it('responds with "invalid credentials" message on non-existing username', async () => {
        const res = await request(server).post('/api/auth/login').send(userB)
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/invalid/i))
      }, 500)
      it('responds with a proper status code on invalid password', async () => {
        const res = await request(server).post('/api/auth/login').send(userC)
        expect(res.status + '').toMatch(/4|5/)
      }, 500)
      it('responds with "invalid credentials" message on invalid password', async () => {
        const res = await request(server).post('/api/auth/login').send(userC)
        expect(JSON.stringify(res.body)).toEqual(expect.stringMatching(/invalid/i))
      }, 500)
    })
  })
})



//Market Endpoints
describe('server.js', () => {
  describe('market endpoints', () => {
    describe('[GET] /api/AfricanMarket/items', () => {
      beforeEach(async () => {
        await db('items').truncate()
      })
      it('gets all items', async () => {
        await request(server).post('/api/AfricanMarket/items')
        const items = await db('items').first()
        expect(items).toHaveProperty('id')
        expect(items).toHaveProperty('item_name')
        expect(items).toHaveProperty('quantity')
        expect(items).toHaveProperty('description')
        expect(items).toHaveProperty('price')
        expect(items).toHaveProperty('location')
      })
    })

    describe('[GET] /api/AfricanMarket/items/:id', () => {
      beforeEach(async () => {
        await db('items').truncate()
      })
      it('gets an item by id', async () => {
        await request(server).post('/api/AfricanMarket/items/:id')
        const items = await db('items').first()
        expect(items).toHaveProperty('id')
        expect(items).toHaveProperty('item_name')
        expect(items).toHaveProperty('quantity')
        expect(items).toHaveProperty('description')
        expect(items).toHaveProperty('price')
        expect(items).toHaveProperty('location')
        //how do we make sure the id matches the requested id
      })
    })

    describe('[POST] /api/AfricanMarket/items/addItem', () => {
      beforeEach(async () => {
        await db('items').truncate()
      })
      it('add a new item', async () => {
        await request(server).post('/api/AfricanMarket/items/addItem')
        const items = await db('items').first()
        expect(items).toHaveProperty('item_name')
        expect(items).toHaveProperty('quantity')
        expect(items).toHaveProperty('description')
        expect(items).toHaveProperty('price')
        expect(items).toHaveProperty('location')
      })
    })

    describe('[PUT] /api/AfricanMarket/items/:id', () => {
      beforeEach(async () => {
        await db('items').truncate()
      })
      it('edits an item', async () => {
        await request(server).post('/api/AfricanMarket/items/:id')
        const items = await db('items').first()
        expect(items).toHaveProperty('item_name')
        expect(items).toHaveProperty('quantity')
        expect(items).toHaveProperty('description')
        expect(items).toHaveProperty('price')
        expect(items).toHaveProperty('location')
      })
    })

    describe('[DELETE] /api/AfricanMarket/items/:id', () => {
      beforeEach(async () => {
        await db('items').truncate()
      })
      it('deletes an item', async () => {
        await request(server).post('/api/AfricanMarket/items/:id')
        const items = await db('items').first()
        expect(items).toHaveProperty('item_name')
        expect(items).toHaveProperty('quantity')
        expect(items).toHaveProperty('description')
        expect(items).toHaveProperty('price')
        expect(items).toHaveProperty('location')
      })
    })
  })
})