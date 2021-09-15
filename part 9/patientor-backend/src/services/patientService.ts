import { v4 as uuidv4 } from 'uuid'
import patientsData from '../../data/patients'
import { Patient, PublicPatient, newPatient, newEntry } from '../types'

let patients: Array<Patient> = patientsData

const getPatients = (): Array<Patient> => {
  return patients
}

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  }

  patients.push(newPatient)
  return newPatient
}

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id)
  return patient
}

const addEntry = (patient: Patient, newEntry: newEntry): Patient => {
  const entry = { ...newEntry, id: uuidv4() }
  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(entry),
  }
  patients = patients.map(p => {
    if (p.id === updatedPatient.id) {
      return updatedPatient
    }
    return p
  })

  return updatedPatient
}

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  findPatientById,
  addEntry,
}
