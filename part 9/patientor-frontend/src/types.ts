export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries: Entry[]
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
  type: EntryType
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}
export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck
  healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital
  discharge: Discharge
}

export interface Discharge {
  date: string
  criteria: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare
  employerName: string
  sickLeave?: SickLeave
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>

export type NewEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>

export interface EntryFormValues {
  type: EntryType
  date: string
  description: string
  specialist: string
  diagnosisCodes: Array<Diagnosis['code']>
  healthCheckRating: HealthCheckRating
  employerName: string
  sickLeaveStartDate: string
  sickLeaveEndDate: string
  dischargeDate: string
  dischargeCriteria: string
}
