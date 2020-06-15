import React from 'react'
import Blog from './Blog'


const BlogList = ({ blogs, deleteBlog, handleLike }) => {
  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div id='blogList'>
      <h2>Blogs</h2>
      {
        sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLikes={handleLike} />
        )}
    </div>
  )
}


export default BlogList