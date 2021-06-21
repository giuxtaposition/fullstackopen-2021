import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebookService'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    status: '',
  })

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
      .catch(error => {
        setNotification({
          message: error,
          status: 'error',
        })
      })
  }, [])

  const handleNameChange = e => {
    setNewName(e.target.value)
  }
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    phonebookService
      .create(personObject)
      .then(returnedPhonebook => {
        setPersons(persons.concat(returnedPhonebook))
        setNewName('')
        setNewNumber('')

        setNotification({
          message: `Added ${returnedPhonebook.name}`,
          status: 'success',
        })
      })
      .catch(error => {
        setNotification({
          message: error.response.data.error,
          status: 'error',
        })
      })
  }

  const deletePerson = personToDelete => {
    const result = window.confirm(
      `Do you really want to delete ${personToDelete.name}?`
    )
    if (result) {
      phonebookService
        .deletePerson(personToDelete.id)
        .then(returnedPhonebook => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setNotification({
            message: `the entry ${personToDelete.name} has been delete successfully`,
            status: 'success',
          })
        })
        .catch(error => {
          setNotification({
            message: `the entry ${personToDelete.name} has already been deleted from server`,
            status: 'error',
          })
          setPersons(persons.filter(p => p.id !== personToDelete.id))
        })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const person = persons.find(p => p.name === newName)
    if (person) {
      const result = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      )

      if (result) {
        const updatedPerson = { ...person, number: newNumber }
        phonebookService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPhonebook => {
            setPersons(
              persons.map(person =>
                person.id !== updatedPerson.id ? person : returnedPhonebook
              )
            )
            setNotification({
              message: `the entry ${returnedPhonebook.name} has been updated`,
              status: 'success',
            })
          })
          .catch(error => {
            if (error.response.data.error.includes('Validation failed')) {
              setNotification({
                message: error.response.data.error,
                status: 'error',
              })
            } else {
              setNotification({
                message: `the entry '${person.name}' has already been deleted from server`,
                status: 'error',
              })

              setPersons(persons.filter(p => p.id !== updatedPerson.id))
            }
          })
      }
    } else {
      addPerson()
    }
  }

  const personsToShow =
    search === ''
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notification.message}
        status={notification.status}
      />
      <Filter onChange={e => handleSearchChange(e)} value={search} />

      <h2>Add a New</h2>
      <PersonForm
        handleNameChange={e => handleNameChange(e)}
        newName={newName}
        handleNumberChange={e => handleNumberChange(e)}
        newNumber={newNumber}
        handleSubmit={e => handleSubmit(e)}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
