import blogService from '../services/blogs'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await blogService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  const copy = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const updateObject = await blogService.updateObject(copy)
    dispatch({
      type: 'VOTE',
      data: updateObject
    })

  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await blogService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }


}

export default reducer