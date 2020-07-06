import React from 'react'

const Notify = ({errorMessage}) => {
  console.log({errorMessage})

  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default Notify