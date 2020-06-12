import React from 'react'

const LogInForm = ({ username, password, user, blogs, setPassword, setUsername, logIn }) => {

  if (user === null) {
    return (
      <div>
        <form onSubmit={logIn}>
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
}

export default LogInForm
