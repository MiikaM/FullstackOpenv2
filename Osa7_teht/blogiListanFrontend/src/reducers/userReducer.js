import userService from '../services/user'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('Userit ovat', users)
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }


}

export default reducer