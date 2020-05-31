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

    if (message.startsWith('Information')) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default Notification