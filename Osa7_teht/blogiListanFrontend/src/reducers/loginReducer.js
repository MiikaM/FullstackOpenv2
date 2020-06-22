import loginService from '../services/login'
import blogService from '../services/blogs'
import { changeNotification } from './notificationReducer'

export const loginUser = (user) => {
  return async dispatch => {
    try {
      const loggedIn = await loginService.login(user)
      dispatch({
        type: 'LOGIN',
        data: loggedIn
      })
      dispatch(changeNotification(`You have logged in as ${loggedIn.name}`))
    } catch (exception) {
      dispatch(changeNotification('wrong credentials', 'error'))
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      dispatch({
        type: 'GET_USER',
        data: loggedUserJSON
      })
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

const reducer = (state = null, action) => {
  let user = null
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(action.data)
      )
      blogService.setToken(action.data.token)
      return action.data
    case 'LOGOUT':
      window.localStorage.clear()
      return state
    case 'GET_USER':
      user = JSON.parse(action.data)
      blogService.setToken(user.token)
      return user
    default:
      return state
  }


}

export default reducer