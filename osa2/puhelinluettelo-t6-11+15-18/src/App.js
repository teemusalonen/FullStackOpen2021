import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
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
        setPersons(initialPersons)      
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber
    }
    personService
      .create(personObject)
        .then(returnedPerson => {
          if(!persons.find(person => person.name === personObject.newName)) {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          }else{
            window.alert( `${newName} is already added to the phonebook`);
          }
        })
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

  const handleDelete = (id, person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      const deleteResponse = personService.del(person.id)
      deleteResponse.then(res => {
        if(res.status === 200){
          const copy = persons.filter(p => p.name !== person.name)
          setPersons(copy)
        }
      })
    }
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
      
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App