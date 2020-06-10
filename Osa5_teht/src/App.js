import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

// TODO   Sovelluksen tilaan tallenetaan token => setUser = req.token if !user => loginForm 
/* TODO   if user=> näytetään blogs ja blogilista  */
/* TODO   Local storage */
/* TODO   user creating new blogs */
/* TODO   Notifkaatiot samanlailla kun puhelinluettelo*/


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlePassword = event => setPassword(event.target.value)
  const handleUsername = event => setUsername(event.target.value)
  const handleUser = event => setUser(event.target.value)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      {user === null ?
        <LogInForm username={username} password={password} user={user} blogs={blogs} setPassword={handlePassword} setUsername={handleUsername} ></LogInForm> :
        <BlogForm  add={} blog={} change={}/>
      }
      
      <ul>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </ul>
    </div>
  )
}

export default App