import React, { useState } from 'react'

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100
  return (
    <div>
      <h1>Statistics</h1>
      {(good > 0) | (neutral > 0) | (bad > 0) ? (
        <table>
          <tbody>
            <Statistic text='Good' value={good} />
            <Statistic text='Neutral' value={neutral} />
            <Statistic text='Bad' value={bad} />
            <Statistic text='All' value={total} />
            <Statistic text='Average' value={average} />
            <Statistic text='Positive' value={positive + '%'} />
          </tbody>
        </table>
      ) : (
        <p>No Feedback Given</p>
      )}
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
