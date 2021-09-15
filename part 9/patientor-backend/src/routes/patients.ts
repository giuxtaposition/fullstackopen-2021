import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient, toNewEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients())
})

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id)

  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    console.log(newPatient)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (e) {
    res.status(400).send((e as Error).message)
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findPatientById(req.params.id)

    if (!patient) {
      throw new Error('Patient not found')
    }

    const newEntry = toNewEntry(req.body)
    console.log(newEntry)
    const addedPatient = patientService.addEntry(patient, newEntry)
    res.json(addedPatient)
  } catch (e) {
    res.status(400).send((e as Error).message)
  }
})

export default router
