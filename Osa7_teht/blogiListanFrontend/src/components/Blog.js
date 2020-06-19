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

  const handleLike = () => {
    const likedBlog = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    addLikes( blog.id, likedBlog)
  }


  return (
    <div>
      <div className='blog' style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
      <div className='blog2' style={showWhenVisible}>
        Title: {blog.title} <button onClick={toggleView}>hide</button> <br />
        url: {blog.url} <br />
        likes: {blog.likes}
        <button onClick={handleLike}>like</button><br />
        Author: {blog.author} <br />
        <button onClick={deleteObject}>remove</button>
      </div>
    </div>
  )
}

export default Blog