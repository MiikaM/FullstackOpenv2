import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link, Redirect, useRouteMatch
} from "react-router-dom"
import Container from '@material-ui/core/Container'


import LogInForm from './components/LogInForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserSite from './components/UserSite'
import { Button, Navbar, Nav } from 'react-bootstrap'



import { getUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'


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
  const user = useSelector(state => state.login)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [])

  // const notification = (message, type = 'success', time = 5) => {
  //   dispatch(changeNotification(message, type, time))
  // }

  const handleLogOut = async () => {
    window.localStorage.clear()
  }

  // const handleLogin = async (loggedUser) => {
  //   try {
  //     const user = await loginService.login(loggedUser)
  //     window.localStorage.setItem(
  //       'loggedBlogAppUser', JSON.stringify(user)
  //     )
  //     blogService.setToken(user.token)
  //     setUser(user)
  //     notification(`You have logged in as ${user.name}`)
  //   } catch (exception) {
  //     notification('wrong credentials', 'error')

  //   }
  // }

  const LoginView = () => (
    <Togglable buttonLabel='login' >
      <LogInForm
      />
    </Togglable>
  )

  // const BlogView = () => (
  //   <Togglable buttonLabel="new blog" ref={blogFormRef}>
  //     <h3>Create new blog</h3>
  //     <BlogForm createBlog={addBlog} />
  //   </Togglable>
  // )

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
              {/* <BlogForm />
              <BlogList /> */}
            </div>
        }
        <Switch>
          <Route path='/users/:id'>
            <UserSite user={user} />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
        </Switch>
      </div>
    </Container>
  )
}

export default App