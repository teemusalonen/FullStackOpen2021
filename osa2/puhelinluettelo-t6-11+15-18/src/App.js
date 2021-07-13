import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import Notification from './Components/Notification'
import PersonForm from './Components/PersonForm'
import personService from './Services/personService'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue] = useState('')
  const [ notificationMsg, setNotificationMsg ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('error')
  
  useEffect(() => {
    personService      
      .getAll()      
      .then(initialPersons => {        
        setPersons(initialPersons)      
      })
  }, [])

  // metodi notificaation animaatioille
  const renderSuccessAnimation = () => {
    setNotificationType('successIn')
    setTimeout(() => {
      setNotificationType('successOut')
    }, 2000)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 2500)  
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber
    }
    const equals = persons.find(person => person.name === personObject.name)
    if(!equals){ 
      personService 
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMsg(`${returnedPerson.name} was succesfully added`)
          renderSuccessAnimation() 
        })
    }else{
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
        personService
        .replace(personObject, equals.id)
        .then(res => {
          if(res.status === 200){
            const copy = [...persons]
            personObject.id = equals.id
            copy[equals.id-1] = personObject
            setPersons(copy)
            setNewName('')
            setNewNumber('')
            setNotificationMsg(`${personObject.name} was succesfully changed`)
            renderSuccessAnimation()
          }
        })  
      }
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

  const handleDelete = (id, person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      const deleteResponse = personService.del(person.id)
      deleteResponse.then(res => {
        if(res.status === 200){
          const copy = persons.filter(p => p.name !== person.name)
          setPersons(copy)
          setNotificationMsg(`${person.name} was succesfully deleted`)
          renderSuccessAnimation()
        }
      })
    }
  }

  const showSearch = persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  
  const personsToShow = (searchValue === '' || showSearch === []) ? persons : showSearch

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={notificationMsg} type={notificationType} />

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