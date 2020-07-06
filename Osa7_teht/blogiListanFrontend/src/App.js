import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link
} from 'react-router-dom'
import Container from '@material-ui/core/Container'


import LogInForm from './components/LogInForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import Blog from './components/Blog'
import UserSite from './components/UserSite'
import { Navbar, Nav } from 'react-bootstrap'



import { getUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, []) //eslint-disable-line

  const handleLogOut = async () => {
    window.localStorage.clear()
  }

  const Navi = () => {
    return (
      <div>
        <div className="navbar-header">
          <a className="navbar-brand" href="/login">BlogApp</a>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/login">login</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </div>
    )
  }

  return (
    <Container>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navi />
        </Navbar>
      </div>
      <div>
        <Notification />
        {
          user !== null ?
            <p>{user.name} logged in
              <Link variant='contained' color='primary' onClick={handleLogOut} to='/login'> logout</Link>
            </p> :
            null
        }

        <div>
          <Switch>
            <Route exact path='/login'>
              <LogInForm />
            </Route>
            <Route path='/users/:id'>
              <UserSite />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route exact path='/'>
              <BlogForm />
              <BlogList />
            </Route>
            <Route path='/blogs/:id'>
              <Blog />
            </Route>
          </Switch>
        </div>

      </div>
    </Container >
  )
}

export default App