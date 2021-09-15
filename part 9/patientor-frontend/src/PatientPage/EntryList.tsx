import React from 'react'
import { Entry } from '../types'
import EntryDetails from './EntryDetails'

const EntryList: React.FC<{
  entries: Array<Entry>
}> = ({ entries }) => {
  return (
    <>
      {entries.map(entry => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
    </>
  )
}

export default EntryList
