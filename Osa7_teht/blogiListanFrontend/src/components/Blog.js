import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote, deleteBlog } from '../reducers/blogReducer'

import { Button } from 'react-bootstrap'

import {
  TableCell,
  TableRow,
  TableBody,
  Table
} from '@material-ui/core'

import { changeNotification } from '../reducers/notificationReducer'



const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [view, setView] = useState(false)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const deleteObject = () => {

    try {
      dispatch(deleteBlog(blog.id))
      dispatch(changeNotification('Blog has been removed'))
    } catch (exception) {
      dispatch(changeNotification(exception.response.data.error, 'error'))
    }
  }

  const handleLike = () => {
    dispatch(vote(blog.id, blog))
  }


  return (
    <Table>
      <TableBody>
        <TableRow className='blog' style={hideWhenVisible}>
          <TableCell >
            {blog.title} {blog.author}
            <Button variant='contained' color='primary' onClick={toggleView}>view</Button>
          </TableCell>
        </TableRow>
      </TableBody >
      <TableBody className='blog2' style={showWhenVisible}>
        <TableRow >
          <TableCell>
            Title: {blog.title} <Button variant='contained' color='default' onClick={toggleView}>hide</Button> <br />
          </TableCell>
        </TableRow >
        <TableRow>
          <TableCell>
            url: {blog.url} <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            likes: {blog.likes}
            <Button variant='contained' color='primary' onClick={handleLike}>like</Button><br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Author: {blog.author} <br />
            <Button variant='contained' color='primary' onClick={deleteObject}>remove</Button>
          </TableCell>
        </TableRow >
      </TableBody>
    </Table>

  )
}

export default Blog