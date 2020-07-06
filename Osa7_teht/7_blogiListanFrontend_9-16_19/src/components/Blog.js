import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { vote, deleteBlog } from '../reducers/blogReducer'

import { Button } from 'react-bootstrap'

import {
  Link
} from '@material-ui/core'


const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const deleteObject = () => {
    dispatch(deleteBlog(blog.id))
  }

  const handleLike = () => {
    dispatch(vote(blog.id, blog))
  }

  if (!blog) {
    return null
  }


  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>

      <Link to={blog.url}> url: {blog.url}</Link>
      <p>
        likes: {blog.likes}
        <Button variant='contained' color='secondary' onClick={handleLike}>like</Button><br />
        Added by: {blog.author.name}
        <Button variant='contained'  onClick={deleteObject}>remove</Button>
      </p>
    </div>
  )
}

export default Blog