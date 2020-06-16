import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(changeNotification(`You added '${content}'`))
    setTimeout(() => {
      dispatch(changeNotification(null))
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm
