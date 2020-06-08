const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('Initializing some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('_ID is defined as id', async () => {
    const allBlogs = await api.get('/api/blogs')
    expect(allBlogs.body[0].id).toBeDefined()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about React', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'React patterns'
    )
  })

  test('Likes is initialized with 0', async () => {
    const newBlog = {
      title: 'Testing in npm',
      author: 'Miika Mikkonen',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const contents = await helper.blogInDb(newBlog)
    expect(contents[0].likes).toBe(0)
  })

  describe('Blogs can be added', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Testing in npm',
        author: 'Miika Mikkonen',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()
      expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtTheEnd.map(r => r.title)
      expect(contents).toContain(
        'Canonical string reduction'
      )
    })

    test('blog without title &/OR author is not added', async () => {
      const newBlog = {
        url: 'Miika Mikkonenn',
        likes: 238
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtTheEnd = await helper.blogsInDb()

      expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('A blog can be updated', () => {
    test('A valid id can be updated', async () => {
      const upBlog = {
        title: 'Testing for update',
        author: 'Miika Mikkonen',
        url: 'testin.miikam.com',
        likes: 1
      }

      const blogAtStart = await helper.blogsInDb()

      await api
        .put(`/api/blogs/${blogAtStart[0].id}`)
        .send(upBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(r => r.title)
      expect(titles).toContain(
        'Testing for update'
      )

    })
  })

  describe('A blog can be viewed', () => {

    test('a specific blog can be viewed with the right id', async () => {
      const blogAtStart = await helper.blogsInDb()

      const blogToView = blogAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonExistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 when id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {

    test('a blog can be deleted returns with status code 204', async () => {
      const blogAtStart = await helper.blogsInDb()
      const blogToDelete = blogAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map(r => r.title)
      expect(contents).not.toContain(blogToDelete.title)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})