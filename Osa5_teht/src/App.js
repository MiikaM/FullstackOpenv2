import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

/* TODO   user creating new blogs */
/* TODO   Notifkaatiot samanlailla kun puhelinluettelo*/


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notification = (message, type = 'notification') => {
    setErrorMessage({ message, type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogOut = async () => {
    window.localStorage.clear()
  }

  const handleLogin = async (loggedUser) => {
    try {
      const user = await loginService.login(loggedUser)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notification(`You have logged in as ${user.name}`)
    } catch (exception) {
      notification('wrong credentials', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notification(`New Blog: ${blogObject.title} by ${blogObject.author} has been added`)
    } catch (exception) {
      notification(exception.response.data.error, 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {

    console.log('eventti o', id)

    try {
      await blogService.deleteObject(id)
      notification('Blog has been removed')
    } catch (exception) {
      notification(exception.response.data.error, 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blogObject, id) => {
    try {
      await blogService.update(id, blogObject)
      notification(`You liked the blog '${blogObject.title}'`)
    } catch (exception) {
      console.log('error o', exception.response.data.error)
      notification(exception.response.data.error, 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const LoginView = () => (
    <Togglable buttonLabel='login' >
      <LogInForm LoggingIn={handleLogin}
      />
    </Togglable>
  )

  const BlogView = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h3>Create new blog</h3>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>BlogApp</h2>
      <Notification message={errorMessage} />
      {
        user === null ?
          LoginView() :
          <div>
            <p>{user.name} logged in<button onClick={handleLogOut}>logout</button></p>
            {BlogView()}
            <BlogList blogs={blogs} deleteBlog={deleteBlog} handleLike={handleLike} />
          </div>
      }
    </div>
  )
}

export default App