import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

/* TODO   user creating new blogs */
/* TODO   Notifkaatiot samanlailla kun puhelinluettelo*/


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState()

  const handlePassword = event => setPassword(event.target.value)
  const handleUsername = event => setUsername(event.target.value)
  const handleTitle = event => setTitle(event.target.value)
  const handleAuthor = event => setAuthor(event.target.value)
  const handleUrl = event => setUrl(event.target.value)
  const handleLikes = event => setLikes(event.target.value)


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

  const handleLogOut = async (event) => {
    window.localStorage.clear()
  }

  const handleLogin = async (event) => {
    console.log('event', event)
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notification(`You have logged in as ${user.name}`)
    } catch (exception) {
      notification('wrong credentials', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: likes,
    }

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notification(`New Blog: ${blogObject.title} by ${blogObject.author} has been added`)
    } catch (exception) {
      notification(exception.response.data.error, 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <h2>BlogApp</h2>
      <Notification message={errorMessage} />
      {
        user === null ?
          <LogInForm username={username} password={password} user={user} blogs={blogs} setPassword={handlePassword} setUsername={handleUsername} logIn={handleLogin} ></LogInForm> :
          <div>
            <p>{user.name} logged in<button onClick={handleLogOut}>logout</button></p>
            <h3>Create new blog</h3>
            <BlogForm title={title} author={author} url={url} handleTitle={handleTitle} handleAuthor={handleAuthor} handleUrl={handleUrl} addBlog={addBlog} />
            <BlogList blogs={blogs} />
          </div>
      }
    </div>
  )
}

export default App