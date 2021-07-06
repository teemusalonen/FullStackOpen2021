import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import axios from 'axios'
import personService from './Services/personService'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue] = useState('')
  
  useEffect(() => {
    personService      
      .getAll()      
      .then(initialPersons => {        
        console.log('olemme useEffectin then-lauseen sisällä')
        setPersons(initialPersons)      
      })
      .catch(console.log('useEffectin catch'))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber
    }
    console.log('olemme addPersonissa')
    personService
      .create(personObject)
        .then(returnedPerson => {
          if(!persons.find(person => person.name === personObject.newName)) {
            console.log('olemme if-lausessa addPersonissa')
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          }else{
            window.alert( `${newName} is already added to the phonebook`);
          }
        })
        .catch(console.log('olemme addPersonin catchissa'))
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  
  const visibilityHandler = (event) => {
    setSearchValue(event.target.value)
  }

  const showSearch = persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))

  const personsToShow = (searchValue === '' || showSearch === []) ? persons : showSearch

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter visibilityHandler={visibilityHandler} searchValue={searchValue} />
      
      <h3>add a new</h3>
      
      <PersonForm 
        addPerson={addPerson} 
        handleNameInput={handleNameInput} 
        handleNumberInput={handleNumberInput} 
        newName={newName} 
        newNumber={newNumber} 
      />

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App