import React, { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Grace Hopper' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName
    }

    console.log('includes(newName) palauttaa:', persons.includes(newName))
    console.log('persons', persons)
    console.log('newName = ', newName)

    if(!persons.find(person => person.name === newName)){
      setPersons(persons.concat(personObject))
      setNewName('')
    }else{
      window.alert( `${newName} is already added to the phonebook`);
    }  
  }

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )

}

export default App