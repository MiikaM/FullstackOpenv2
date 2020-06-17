import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div >
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
  })

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return (
    <div>
      {
        sortedAnecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(vote(anecdote))
              dispatch(changeNotification(`You voted for '${anecdote.content}'`, 5))
            }
            }
          />
        )
      }
    </div>
  )
}

export default AnecdoteList