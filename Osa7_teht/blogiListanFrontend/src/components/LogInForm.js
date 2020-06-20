import React, { useState } from 'react'
import {
  TextField, Button
} from '@material-ui/core'

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
          <TextField
            label='username'
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          <TextField
            label='password'
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <div>
          <Button id='login-button' variant='contained' color='primary' type="submit">login</Button>
        </div>
      </form>
    </div>
  )
}

export default LogInForm
