import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

/**
 * Displays a notification with styles if the message is an error it uses error styles and if it's 
 * a notification then it uses notification styles
 * @param {message} message is the message that tells what has happened 
 */
const Notification = () => {
  const notification = useSelector(state => state.notification)

  console.log('noti on ', notification)
  if (notification === null) {
    return null
  }

  console.log('message o', notification.message)

  return (
    <Alert severity={notification.type}  >
      {notification.message}
    </Alert>
  )
}

export default Notification