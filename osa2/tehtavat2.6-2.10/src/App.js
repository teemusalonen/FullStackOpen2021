import React, { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue] = useState('')

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

  const showSearch = persons.filter(person => person.name.toLowerCase().includes(searchValue))

  const personsToShow = (searchValue === '' || showSearch === []) ? persons : showSearch

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={visibilityHandler} value={searchValue}/>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameInput} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberInput} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App