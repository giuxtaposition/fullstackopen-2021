import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = () => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted ${anecdote.content}`, 3))
  }
  const style = {
    padding: 10,
  }
  return (
    <div style={style}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
  })

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

export default AnecdoteList
