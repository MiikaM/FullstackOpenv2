import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  console.log('anecdote is', anecdote)
  const copy = { ...anecdote, votes: anecdote.votes + 1 }
  console.log('copy is', copy)
  return async dispatch => {
    const updateObject = await anecdoteService.updateObject(copy)
    dispatch({
      type: 'VOTE',
      data: updateObject
    })

  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      console.log('action data on', action.data)
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