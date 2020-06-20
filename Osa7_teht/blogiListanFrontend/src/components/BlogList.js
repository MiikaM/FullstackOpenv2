import React from 'react'
import Blog from './Blog'
import {
  TableContainer,
  Paper,
} from '@material-ui/core'


const BlogList = ({ blogs, deleteBlog, handleLike }) => {
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