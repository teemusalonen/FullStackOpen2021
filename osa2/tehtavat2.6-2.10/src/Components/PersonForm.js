import React from 'react'

const PersonForm = ({ addPerson, handleNameInput, handleNumberInput, newName, newNumber }) => {
  return (
    <div>
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
    </div>
  )
}

export default PersonForm