import patientData from '../../data/patients.json';
const { v1: uuid } = require('uuid')//eslint-disable-line


import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: String(uuid()), //eslint-disable-line
    ...entry
  };

  console.log({newPatientEntry});

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  findById,
  getNonSensitiveEntries
};