
export const changeNotification = (notification, time) => {
  console.log('noti and time', notification, time)
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      notification: notification
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

const clearNotification = () => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      notification: null
    })
  }
}

const notificationReducer = (state = null, action) => {

  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer