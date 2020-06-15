import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = event => setTitle(event.target.value)
  const handleAuthor = event => setAuthor(event.target.value)
  const handleUrl = event => setUrl(event.target.value)

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title'
          type="text"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type="text"
          value={author}
          onChange={handleAuthor}
        />
      </div>
      <div>
        url:
        <input
          id='url'
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