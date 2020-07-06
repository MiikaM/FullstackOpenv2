import patientData from '../../data/patients';
const { v1: uuid } = require('uuid')//eslint-disable-line
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry, Entry } from '../types';


const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: String(uuid()), //eslint-disable-line
    entries: [],
    ...entry
  };

  ({ newPatientEntry });

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  ({ entry, id });

  if (!entry) return entry;

  const patientInfo = patients.find(patient => patient.id === id);

  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry
  } as Entry;

  if (!patientInfo) return newPatientEntry;

  patientInfo.entries.push(newPatientEntry);

  return newPatientEntry;

};

const findById = (id: string): PatientEntry | undefined => {

  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  addPatientEntry,
  addEntry,
  findById,
  getNonSensitiveEntries
};