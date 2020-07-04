/* eslint-disable @typescript-eslint/no-empty-interface */

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum EntryType {
  HospitalEntry = 'Hospital',
  OccupationalHealthcareEntry = 'OccupationalHealthcare',
  HealthCheckEntry = 'HealthCheck'
}


interface BaseEntry {
  id: string;
  type: EntryType;
  healthCheckRating?: HealthCheckRating; 
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.HospitalEntry;
  discharge: {
    date: string;
    criteria: string;
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcareEntry;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheckEntry;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;

export type NewEntry = Omit<Entry, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;