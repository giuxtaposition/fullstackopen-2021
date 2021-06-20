import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={e => deletePerson(person)}>Delete</button>
    </div>
  )
}

export default Person
