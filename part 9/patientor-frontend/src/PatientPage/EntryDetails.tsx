import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic'
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  EntryType,
} from '../types'
import DiagnosisList from './DiagnosisList'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Hospital = ({ entry }: { entry: HospitalEntry }): JSX.Element => {
  return (
    <Segment className='green'>
      <Header>
        {entry.date} <Icon name='hospital' />
      </Header>
      <span style={{ color: 'grey' }}>
        <em>{entry.description}</em>
      </span>
      <br />
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      )}
    </Segment>
  )
}

const healthCheckColor = {
  0: { color: 'green' as SemanticCOLORS },
  1: { color: 'yellow' as SemanticCOLORS },
  2: { color: 'orange' as SemanticCOLORS },
  3: { color: 'red' as SemanticCOLORS },
}

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {
  return (
    <Segment className='blue'>
      <Header>
        {entry.date} <Icon name='user doctor' />
      </Header>
      <span style={{ color: 'grey' }}>
        <em>{entry.description}</em>
      </span>
      <br />
      <Icon name='heart' {...healthCheckColor[entry.healthCheckRating]} />
    </Segment>
  )
}

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry
}): JSX.Element => {
  return (
    <Segment className='purple'>
      <Header>
        {entry.date} <Icon name='stethoscope' /> {entry.employerName}
      </Header>
      <span style={{ color: 'grey' }}>
        <em>{entry.description}</em>
      </span>
      <br />
    </Segment>
  )
}

const EntryDetails: React.FC<{
  entry: Entry
}> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <Hospital entry={entry} />
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />
    default:
      return assertNever(entry)
  }
}

export default EntryDetails
