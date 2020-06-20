import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Paper,
} from '@material-ui/core'


const BlogList = ({ deleteBlog, handleLike }) => {
  const blogs = useSelector(state => state.blogs)

  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div id='blogList'>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        {
          sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLikes={handleLike} />
          )}
      </TableContainer>
    </div>
  )
}


export default BlogList