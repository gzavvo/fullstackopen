import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Alert from './components/Alert'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingUser = persons.find(person => person.name === newName)
    if (existingUser) {
      if (window.confirm(` ${existingUser.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          ...existingUser,
          number: newNumber
        }
        personService
          .updateNumber(existingUser.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingUser.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Number of ${returnedPerson.name} updated`)
            setTimeout(() => setNotificationMessage(null), 3000)
          })
          .catch(error => {
            setAlertMessage(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(n => n.id !== existingUser.id))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {

      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => setNotificationMessage(null), 3000)
        })
    }
  }

  const removePersonOf = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Alert message={alertMessage} />
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        newFilter={newFilter}
        removePersonOf={removePersonOf}
      />
    </div>
  );
}

export default App
