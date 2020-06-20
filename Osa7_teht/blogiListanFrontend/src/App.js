import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import LogInForm from './components/LogInForm'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { Button, Navbar, Nav } from 'react-bootstrap'
import Container from '@material-ui/core/Container'


import { initializeBlogs, vote } from './reducers/blogReducer'
import { changeNotification } from './reducers/notificationReducer'


//TODO: Tilat REDUXIIN
//TODO: Blogit ja kirjautuminen REDUXIIN
//TODO: Blogien liketys ja poisto toimintaan
//TODO: Käyttäjä näkymä => Users { user.name: count(blogs.created)}
//TODO: Yksittäisen käyttäjän näkymä => /users/:id { user,  <li>user.blogs.map</li>}
//TODO: Linkki käyttäjä näkymästä yksittäisen käyttäjän näkymään
//TODO: Yksittäisen blogin näkymä
//TODO: Linkki blogi näkymästä yksittäisen blogin näkymään
//TODO: Navigaatio menu
//TODO: BACKEND: Kommentointi mahollisuus yksittäisen blogin näkymään {api/blogs/:id/comments}
//TODO: Kommentointi Frontendiin
//TODO: Tyylitellään


const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notification = (message, type = 'success', time = 5) => {
    dispatch(changeNotification(message, type, time))
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
    }
  }

  const deleteBlog = async (id) => {

    console.log('eventti o', id)

    try {
      await blogService.deleteObject(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      notification('Blog has been removed')
    } catch (exception) {
      notification(exception.response.data.error, 'error')
    }
  }

  const handleLike = async (id, blogObject) => {
    try {
      dispatch(vote)
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
      notification(`You liked the blog '${blogObject.title}'`)
    } catch (exception) {
      notification(exception.response.data.error, 'error')
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

  // const Navi = () => {
  //   return (
  //     <div>
  //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //       <Navbar.Collapse id="responsive-navbar-nav">
  //         <Nav className="mr-auto">
  //           <Nav.Link href="#" as="span">
  //             <Link style={padding} to="/">home</Link>
  //           </Nav.Link>
  //           <Nav.Link href="#" as="span">
  //             <Link style={padding} to="/notes">notes</Link>
  //           </Nav.Link>
  //           <Nav.Link href="#" as="span">
  //             <Link style={padding} to="/users">users</Link>
  //           </Nav.Link>
  //           <Nav.Link href="#" as="span">
  //             {user
  //               ? <em>{user} logged in</em>
  //               : <Link to="/login">login</Link>
  //             }
  //           </Nav.Link>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </div>
  //   )
  // }

  return (
    <Container>
      {/* // <div>
    //   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //     <Navi />
    //   </Navbar>
    // </div> */}

      <div>
        <h2>BlogApp</h2>
        <Notification />
        {
          user === null ?
            LoginView() :
            <div>
              <p>{user.name} logged in<Button variant='contained' color='primary' onClick={handleLogOut}>logout</Button></p>
              {BlogView()}
              <BlogList blogs={blogs} deleteBlog={deleteBlog} handleLike={handleLike} />
            </div>
        }
      </div>
    </Container>
  )
}

export default App