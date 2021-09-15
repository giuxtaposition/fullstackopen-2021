import { NewEntry, NewBaseEntry, EntryFormValues, EntryType } from './types'

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

export const toNewEntry = (entryFormValues: EntryFormValues): NewEntry => {
  const { type, description, date, specialist, diagnosisCodes } =
    entryFormValues
  const newBaseEntry: NewBaseEntry = {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  }

  switch (type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: entryFormValues.healthCheckRating,
      }

    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type,
        employerName: entryFormValues.employerName,
        sickLeave: {
          startDate: entryFormValues.sickLeaveStartDate,
          endDate: entryFormValues.sickLeaveEndDate,
        },
      }

    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type,
        discharge: {
          date: entryFormValues.dischargeDate,
          criteria: entryFormValues.dischargeCriteria,
        },
      }

    default:
      return assertNever(type)
  }
}
