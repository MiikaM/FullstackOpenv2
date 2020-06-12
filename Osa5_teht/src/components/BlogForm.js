import React from 'react'

const BlogForm = ({ title, author, url, handleTitle, handleAuthor, handleUrl, addBlog }) => {

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          onChange={handleAuthor}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          onChange={handleUrl}
        />
      </div>
      <button type="submit">save</button>
    </form >
  )
}

export default BlogForm