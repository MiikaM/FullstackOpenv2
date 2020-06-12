import React, { useState } from 'react'




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


  return (
    <div>
      <div className='blog' style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
      <div className='blog' style={showWhenVisible}>
        Title: {blog.title} <button onClick={toggleView}>hide</button> <br />
        url: {blog.url} <br />
        likes: {blog.likes}
        <button onClick={addLikes}>like</button><br />
        Author: {blog.author} <br />
        <button onClick={deleteObject}>remove</button>
      </div>
    </div>
  )
}

const BlogList = ({ blogs, deleteBlog, handleLike }) => {
  let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>Blogs</h2>
      {
        sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLikes={handleLike} />
        )}
    </div>
  )
}


export default BlogList