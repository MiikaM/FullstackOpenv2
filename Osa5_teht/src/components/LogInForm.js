import React, { useState } from 'react'

const LogInForm = ({ LoggingIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlePassword = event => setPassword(event.target.value)
  const handleUsername = event => setUsername(event.target.value)

  const logIn = async (event) => {
    event.preventDefault()

    LoggingIn({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={logIn}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LogInForm
