import anecdoteService from '../services/AnecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    case 'VOTE_ANECDOTE':
      const id = action.data.id

      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }

      return state
        .map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes)

    case 'CREATE_ANECDOTE':
      console.log(action.data)
      return [...state, action.data]
    default:
      return state
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateVote(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
