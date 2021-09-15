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

export enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
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

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck
  healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital
  discharge: Discharge
}

export interface Discharge {
  date: string
  criteria: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
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

export interface Patient {
  id: string
  name: string
  ssn: string
  occupation: string
  gender: Gender
  dateOfBirth: string
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
export type newPatient = Omit<Patient, 'id'>
export type newBaseEntry = Omit<Entry, 'id'>
export type newEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>
