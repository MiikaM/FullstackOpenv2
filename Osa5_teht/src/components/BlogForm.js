import React from 'react'

const BlogForm = ({add, blog, change }) => {

  return (
    <form onSubmit={add}>
      <input
        value={blog}
        onChange={change}
      />
      <button type="submit">save</button>
    </form>
  )
}


export default BlogForm