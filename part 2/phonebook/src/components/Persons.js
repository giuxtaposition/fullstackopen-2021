import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => (
        <Person person={person} key={person.name} deletePerson={deletePerson} />
      ))}
    </div>
  )
}

export default Persons
