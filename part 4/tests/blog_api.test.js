const supertest = require('supertest')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(
    helper.initialBlogs.map(blog => {
      return new Blog(blog).save()
    })
  )
})

describe('when there is initially some blogs saved', () => {
  test('are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are returned the correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('have a unique identifier named "id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Adding a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'I like potatoes',
      author: 'Giulia Ye',
      url: 'https://www.giuxtaposition.tech',
      likes: 69,
    }
    await api.post('/api/blogs').send(newBlog).expect(200)
    const updatedBlogs = await api.get('/api/blogs')
    expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('if number of likes is missing set to 0', async () => {
    const newBlog = {
      title: 'I like potatoes',
      author: 'Giulia Ye',
      url: 'https://www.giuxtaposition.tech',
    }
    await api.post('/api/blogs').send(newBlog).expect(200)
    const updatedBlogs = await api.get('/api/blogs')
    expect(updatedBlogs.body[helper.initialBlogs.length].likes).toBe(0)
  })

  test('title is required', async () => {
    const newBlog = {
      author: 'Giulia Ye',
      url: 'https://www.giuxtaposition.tech',
      likes: 69,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('author is required', async () => {
    const newBlog = {
      title: 'I like potatoes',
      url: 'https://www.giuxtaposition.tech',
      likes: 69,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

afterAll(() => mongoose.connection.close())
