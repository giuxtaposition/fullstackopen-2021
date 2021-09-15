import {
  Gender,
  newBaseEntry,
  newPatient,
  newEntry,
  EntryType,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }

  return name
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth')
  }

  return dateOfBirth
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }

  return ssn
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }

  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }

  return occupation
}

type Fields = {
  name: unknown
  dateOfBirth: unknown
  ssn: unknown
  gender: unknown
  occupation: unknown
}

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): newPatient => {
  const newEntry: newPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  }

  return newEntry
}

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description')
  }

  return description
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date')
  }

  return date
}

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist')
  }

  return specialist
}

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type)
}

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error(`Invalid or missing entry type`)
  }
  return type
}

type BaseEntryFields = {
  description: unknown
  date: unknown
  specialist: unknown
  type: unknown
}

export const toNewBaseEntry = ({
  description,
  date,
  specialist,
  type,
}: BaseEntryFields): newBaseEntry => {
  const newEntry: newBaseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseEntryType(type),
  }

  return newEntry
}

// Exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const isDischarge = (discharge: any): boolean => {
  return (
    discharge.date &&
    discharge.criteria &&
    isString(discharge.date) &&
    isString(discharge.criteria)
  )
}

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Invalid or missing discharge field`)
  }

  return discharge as Discharge
}

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName')
  }

  return employerName
}

const isSickLeave = (sickLeave: any): boolean => {
  return (
    sickLeave.startDate &&
    sickLeave.endDate &&
    isString(sickLeave.startDate) &&
    isString(sickLeave.endDate)
  )
}

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error(`Invalid or missing sick leave fields`)
  }

  return sickLeave as SickLeave
}

const isHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating)
}

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    typeof healthCheckRating === 'undefined' ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing health check rating: ' + healthCheckRating
    )
  }

  return healthCheckRating
}

export const toNewEntry = (object: any): newEntry => {
  // Set up base entry
  const newEntry = toNewBaseEntry(object) as newEntry

  // Get rest of the fields according to the appropriate entry type
  switch (newEntry.type) {
    case EntryType.Hospital:
      newEntry.discharge = parseDischarge(object.discharge)
      return newEntry

    case EntryType.OccupationalHealthcare:
      newEntry.employerName = parseEmployerName(object.employerName)

      if (
        !Object.values(object.sickLeave).every(
          field => field === null || field === ''
        )
      ) {
        console.log(object.sickLeave)
        newEntry.sickLeave = parseSickLeave(object.sickLeave)
      }
      return newEntry

    case EntryType.HealthCheck:
      newEntry.healthCheckRating = parseHealthCheckRating(
        object.healthCheckRating
      )
      return newEntry

    default:
      return assertNever(newEntry)
  }
}
