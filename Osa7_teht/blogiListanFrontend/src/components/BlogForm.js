import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import {
  TextField, Button
} from '@material-ui/core'


const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = event => setTitle(event.target.value)
  const handleAuthor = event => setAuthor(event.target.value)
  const handleUrl = event => setUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog({
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
    }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField
          label='title'
          id='title'
          type="text"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        <TextField
          label='author'
          id='author'
          type="text"
          value={author}
          onChange={handleAuthor}
        />
      </div>
      <div>
        <TextField
          label='url'
          id='url'
          type="text"
          value={url}
          onChange={handleUrl}
        />
      </div>
      <Button variant='contained' color='primary' type="submit">save</Button>
    </form >
  )
}

export default BlogForm