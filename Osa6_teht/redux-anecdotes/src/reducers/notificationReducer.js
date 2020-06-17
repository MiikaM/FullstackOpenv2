let timeOutId = null

export const changeNotification = (notification, time) => {
  if (timeOutId !== null) clearTimeout(timeOutId)
  timeOutId = null
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      notification: notification
    })

    timeOutId = setTimeout(() => {
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