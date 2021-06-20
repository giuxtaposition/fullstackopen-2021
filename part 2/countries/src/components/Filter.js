import React from 'react'

function Filter({ onChange, value }) {
  return (
    <div>
      Find Countries <input onChange={onChange} value={value} />
    </div>
  )
}

export default Filter
