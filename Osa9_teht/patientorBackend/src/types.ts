/* eslint-disable @typescript-eslint/no-empty-interface */

export interface Entry {
  // desccription: string;
  // creationDate: string;
  // specialistInfo: string;
  // icd10Codes: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
} 

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
} 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;