import React, { useState } from 'react'

const Anecdote = ({ title, anecdote, points }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>Has {points} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  )

  function indexOfMax(array) {
    var maxCurrent = array[0]
    var maxIndex = 0

    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxCurrent) {
        maxIndex = i
        maxCurrent = array[i]
      }
    }

    return maxIndex
  }

  const mostVoted = indexOfMax(points)

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const handleNext = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    if (index === selected) {
      handleNext()
    } else {
      setSelected(index)
    }
  }

  return (
    <>
      <Anecdote
        title='Anecdote of the day'
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next Anecdote</button>

      <Anecdote
        title='Anecdotes with most votes'
        anecdote={anecdotes[mostVoted]}
        points={points[mostVoted]}
      />
    </>
  )
}

export default App
