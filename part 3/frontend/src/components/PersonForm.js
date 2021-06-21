import React from 'react'

const PersonForm = ({
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type='submit' onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
