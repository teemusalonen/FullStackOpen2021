import React from 'react'

const Persons = ({ personsToShow, handleDelete }) => {

  return (
    <div>
      {personsToShow.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person)}>delete</button>  
        </p>
    ))}
    </div>
  )
}

export default Persons