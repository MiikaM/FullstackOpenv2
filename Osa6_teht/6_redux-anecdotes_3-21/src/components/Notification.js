import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (props.notification === null) return <div></div>

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateProps = (state) => {
  return {
    notification: state.notification
  }
}


export default connect(mapStateProps)(Notification)