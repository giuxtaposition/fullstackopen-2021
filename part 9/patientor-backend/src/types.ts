export interface Diagnose {
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
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
}

export type NonSensitivePatientsData = Omit<Patient, 'ssn'>;
export type newPatient = Omit<Patient, 'id'>;
