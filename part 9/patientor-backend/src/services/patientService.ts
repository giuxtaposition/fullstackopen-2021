import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientsData, newPatient } from '../types';

const patients: Array<Patient> = patientsData; 

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientsData = (): NonSensitivePatientsData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient,
};
