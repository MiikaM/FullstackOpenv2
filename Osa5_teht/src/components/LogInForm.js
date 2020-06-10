import React from 'react'
import Blog from './Blog'

const LogInForm = ({ username, password, user, blogs, setPassword, setUsername }) => {

  if (user === null) {
    return (
      <div>
        <form>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={setUsername}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={setPassword}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LogInForm
