import React from 'react'

/**
 * Displays a notification with styles if the message is an error it uses error styles and if it's 
 * a notification then it uses notification styles
 * @param {message} message is the message that tells what has happened 
 */
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  console.log('message o', message)

  return (
    <div className={message.type} > 
    {message.message} 
    </div>
    )
}

export default Notification