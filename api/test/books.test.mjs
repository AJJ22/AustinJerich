import { test } from 'node:test'
import assert from 'node:assert'
import express from 'express'
import request from 'supertest'
import { createRouter } from '../routes/books.mjs'
import { MockBookRepository, sampleBooks } from './mocks/bookRepository.mock.mjs'

// Helper function to create Express app with mocked repository
function createTestApp(mockRepository) {
  const app = express()
  app.use(express.json())
  app.use('/books', createRouter(mockRepository))
  return app
}

test('GET /books - Returns all books', async (t) => {
  await t.test('should return array of books', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).get('/books')

    assert.equal(res.status, 200)
    assert.ok(Array.isArray(res.body))
    assert.equal(res.body.length, 3)
  })

  await t.test('should include book details', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).get('/books')

    assert.equal(res.body[0].title, 'The Understory')
    assert.equal(res.body[0].author, 'James W. Tolan')
  })

  await t.test('should call repository getAll method', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    await request(app).get('/books')

    const calls = mockRepo.getCallHistory('getAll')
    assert.equal(calls.length, 1)
  })
})

test('GET /books/:id - Returns single book', async (t) => {
  await t.test('should return book by ID', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).get('/books/69263e138d6f9ef025a3be7f')

    assert.equal(res.status, 200)
    assert.equal(res.body.title, 'The Understory')
  })

  await t.test('should return 400 for invalid id', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).get('/books/nonexistent')

    assert.equal(res.status, 400)
    assert.equal(res.body.message, 'invalid id')
  })

  await t.test('should return 400 for invalid ID format', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).get('/books/invalid-id-format')

    assert.equal(res.status, 400)
    assert.equal(res.body.message, 'invalid id')
  })

  await t.test('should call repository getById method', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    await request(app).get('/books/69263e138d6f9ef025a3be7f')

    const calls = mockRepo.getCallHistory('getById')
    assert.equal(calls.length, 1)
  })
})

test('POST /books - Create new book', async (t) => {
  await t.test('should create a new book', async () => {
    const mockRepo = new MockBookRepository([])
    const app = createTestApp(mockRepo)
    const newBook = { title: 'Test Book', author: 'Test Author', status: 'read', rating: 5 }

    const res = await request(app).post('/books').send(newBook)

    assert.equal(res.status, 200)
    assert.ok(res.body.insertedId)
    assert.equal(res.body.acknowledged, true)
  })

  await t.test('should reject array input with 400 status', async () => {
    const mockRepo = new MockBookRepository([])
    const app = createTestApp(mockRepo)

    const res = await request(app).post('/books').send([{ title: 'Book 1' }, { title: 'Book 2' }])

    assert.equal(res.status, 400)
    assert.equal(res.body.message, 'array not allowed')
  })

  await t.test('should call repository create method', async () => {
    const mockRepo = new MockBookRepository([])
    const app = createTestApp(mockRepo)
    const newBook = { title: 'Test Book' }

    await request(app).post('/books').send(newBook)

    const calls = mockRepo.getCallHistory('create')
    assert.equal(calls.length, 1)
  })

  await t.test('should store data in repository', async () => {
    const mockRepo = new MockBookRepository([])
    const app = createTestApp(mockRepo)
    const newBook = { title: 'New Book', author: 'New Author' }

    await request(app).post('/books').send(newBook)

    assert.equal(mockRepo.books.length, 1)
    assert.equal(mockRepo.books[0].title, 'New Book')
  })
})

test('PUT /books/:id - Update book', async (t) => {
  await t.test('should update existing book', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)
    const updates = { title: 'Updated Title', rating: 5 }

    const res = await request(app).put('/books/69263e138d6f9ef025a3be7f').send(updates)

    assert.equal(res.status, 200)
    assert.equal(res.body.title, 'Updated Title')
    assert.equal(res.body.rating, 5)
  })

  await t.test('should return 400 for invalid id', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).put('/books/nonexistent').send({ title: 'New Title' })

    assert.equal(res.status, 400)
  })

  await t.test('should return 400 for invalid ID format', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).put('/books/invalid-id').send({ title: 'New Title' })

    assert.equal(res.status, 400)
  })

  await t.test('should call repository update method', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    await request(app).put('/books/69263e138d6f9ef025a3be7f').send({ title: 'Updated' })

    const calls = mockRepo.getCallHistory('update')
    assert.equal(calls.length, 1)
  })

  await t.test('should trim string values', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).put('/books/69263e138d6f9ef025a3be7f').send({ title: '  Trimmed Title  ' })

    assert.equal(res.body.title, 'Trimmed Title')
  })
})

test('DELETE /books/:id - Delete book', async (t) => {
  await t.test('should delete existing book', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).delete('/books/69263e138d6f9ef025a3be7f')

    assert.equal(res.status, 204)
    assert.equal(mockRepo.books.length, 2)
  })

  await t.test('should return 400 for invalid ID format', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    const res = await request(app).delete('/books/invalid-id')

    assert.equal(res.status, 400)
  })

  await t.test('should call repository delete method', async () => {
    const mockRepo = new MockBookRepository(sampleBooks)
    const app = createTestApp(mockRepo)

    await request(app).delete('/books/69263e138d6f9ef025a3be7f')

    const calls = mockRepo.getCallHistory('delete')
    assert.equal(calls.length, 1)
  })
})