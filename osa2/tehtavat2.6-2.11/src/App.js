import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue] = useState('')
  
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber
    }

    if(!persons.find(person => person.name === newName)){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }else{
      window.alert( `${newName} is already added to the phonebook`);
    }  
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