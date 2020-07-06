import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import {
  Link,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div id='blogList'>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {
              sortedBlogs.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link href={`/blogs/${blog.id}`} color='inherit'>{blog.title}</Link>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default BlogList