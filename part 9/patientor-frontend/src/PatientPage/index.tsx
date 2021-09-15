import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants'
import { useStateValue, updatePatient } from '../state'
import { NewEntry, Patient } from '../types'
import { Container, Header, Icon, Button } from 'semantic-ui-react'
import { SemanticICONS } from 'semantic-ui-react'
import EntryList from './EntryList'
import AddEntryModal from '../AddEntryModal'

const genderIcon = {
  male: { name: 'mars' as SemanticICONS },
  female: { name: 'venus' as SemanticICONS },
  other: { name: 'genderless' as SemanticICONS },
}

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [{ patients }, dispatch] = useStateValue()
  const [patient, setPatient] = useState<Patient | undefined>(patients[id])

  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      )
      dispatch(updatePatient(updatedPatient))
      console.log(newEntry)
      setPatient(updatedPatient)
      closeModal()
    } catch (e: any) {
      console.error(e.response.data)
      setError(e.response.data.error)
    }
  }

  useEffect(() => {
    const fetchAndUpdatePatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(updatePatient(patientFromApi))
        setPatient(patientFromApi)
      } catch (e) {
        console.error(e)
      }
    }

    if (!patient || !patient.ssn) {
      void fetchAndUpdatePatient()
    }
  }, [id, patient, dispatch])

  if (!patient) return null

  return (
    <div className='PatientPage'>
      <Container textAlign='left'>
        <Header as='h2'>
          {patient.name} <Icon {...genderIcon[patient.gender]} />
        </Header>
        <p>
          ssn: {patient.ssn}
          <br />
          occupation {patient.occupation}
        </p>
        <Header as='h3'>entries</Header>
        {patient.entries && <EntryList entries={patient.entries} />}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <br />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  )
}

export default PatientPage
