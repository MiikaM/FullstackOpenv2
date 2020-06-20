import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  TableCell,
  TableRow,
  TableBody,
  Table
} from '@material-ui/core'



const Blog = ({ blog, deleteBlog, addLikes }) => {
  const [view, setView] = useState(false)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const deleteObject = () => {
    deleteBlog(blog.id)
  }

  const handleLike = () => {
    const likedBlog = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    addLikes(blog.id, likedBlog)
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