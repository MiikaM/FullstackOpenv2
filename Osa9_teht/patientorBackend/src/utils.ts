/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatientEntry,
  Gender,
  NewEntry,
  EntryType, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry,
  Diagnosis,
  HealthCheckRating,

} from './types';
import diagnoseData from '../data/diagnoses.json';
import _ from 'lodash';


const diagnoses: Array<Diagnosis> = diagnoseData;

const toNewPatient = (object: any): NewPatientEntry => {
  console.log('Object on ', object);
  return {
    name: parseText(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
    ssn: parseText(object.ssn)
  };

};

const toNewEntry = (object: any): NewEntry => {
  console.log('Object on ', object);
  const type = parseType(object.type);

  switch (type) {
    case 'Hospital':
      return toNewHospitalEntry(object);
    case 'OccupationalHealthcare':
      return toNewOccupationalEntry(object);
    case 'HealthCheck':
      return toNewHealthCheckEntry(object);
    default:
      throw new Error('Incorrect or missing type: ' + type);
  }
};

const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  let healthRating = undefined;
  let codes = undefined;
  if (object.healthCheckRating) healthRating = parseHealthCheckRating(object.healthCheckRating);
  if (object.diagnosisCodes) codes = parseDiagnosisCodes(object.diagnosisCodes);

  const hospitalEntry: NewHospitalEntry = {
    type: "Hospital",
    description: parseText(object.description),
    date: parseDate(object.date),
    specialist: parseText(object.specialist),
    diagnosisCodes: codes,
    healthCheckRating: healthRating,
    discharge: {
      date: parseDate(object.discharge.date),
      criteria: parseText(object.discharge.criteria)
    }
  };

  return hospitalEntry;
};

const toNewOccupationalEntry = (object: any): NewOccupationalHealthcareEntry => {
  let healthRating = undefined;
  let codes = undefined;
  let sickLeave = undefined;
  if (object.sickLeave) {
    sickLeave = {
      startDate: parseDate(object.sickLeave.startDate),
      endDate: parseDate(object.sickLeave.endDate)
    };
  }
  if (object.healthCheckRating) healthRating = parseHealthCheckRating(object.healthCheckRating);
  if (object.diagnosisCodes) codes = parseDiagnosisCodes(object.diagnosisCodes);

  const newOccupationalEntry: NewOccupationalHealthcareEntry = {
    type: "OccupationalHealthcare",
    description: parseText(object.description),
    date: parseDate(object.date),
    specialist: parseText(object.specialist),
    diagnosisCodes: codes,
    healthCheckRating: healthRating,
    employerName: parseText(object.employerName),
    sickLeave: sickLeave
  };

  return newOccupationalEntry;
};

const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  let healthRating = undefined;
  let codes = undefined;
  if (object.healthCheckRating) healthRating = parseHealthCheckRating(object.healthCheckRating);
  if (object.diagnosisCodes) codes = parseDiagnosisCodes(object.diagnosisCodes);

  const newHealthCheckEntry: NewHealthCheckEntry = {
    type: "HealthCheck",
    description: parseText(object.description),
    date: parseDate(object.date),
    specialist: parseText(object.specialist),
    diagnosisCodes: codes,
    healthCheckRating: healthRating
  };

  return newHealthCheckEntry;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isStringArray = (array: any): array is Array<string> => {
  let length = 0;

  for (const str in array) {
    if (typeof str === 'string') {
      length++;
    }
  }

  return (length === array.length);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): boolean => {
  return Object.values(Gender).includes(gender);
};

const isType = (type: any): boolean => {
  return Object.values(EntryType).includes(type);
};

const isDiagnosisCodes = (diagnosisCodes: any): boolean => {
  const diagnosesMapped = diagnoses.map(d => d.code);

  console.log({ diagnosesMapped });
  console.log({ diagnosisCodes });

  if (diagnosisCodes.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const intersection = _.intersection(diagnosesMapped, diagnosisCodes);

    console.log({ intersection });
    if (!intersection || intersection.length < 1) return false;
  }

  return true;
};

const isHealthRating = (rating: any): boolean => {
  if (typeof rating == 'number' || !isNaN(Number(rating))) {
    return Object.values(HealthCheckRating).includes(rating);
  }
  return false;
};


const parseDate = (date: any): string => {
  console.log('date on ', date);

  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return String(date);
};


const parseGender = (gender: any): Gender => {
  console.log('gender on ', gender);
  const genderEnum = Object.values(Gender).find(g => g === gender);

  console.log({ genderEnum });

  if (!isGender(gender) || !isString(gender) || !genderEnum) {
    throw new Error('Incorrect Gender input: ' + gender);
  }

  return genderEnum;
};

const parseText = (text: any): string => {
  console.log('text on ', text);

  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text: ' + text);
  }

  return text;
};

const parseType = (type: any): EntryType => {
  console.log('type on ', type);
  const typeEnum = Object.values(EntryType).find(g => g === type);

  if (!type || !isString(type) || !isType(type) || !typeEnum) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return typeEnum;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] | undefined => {
  console.log('diagnosisCodes on ', diagnosisCodes);
  if (!diagnosisCodes) return undefined;

  if (!isDiagnosisCodes(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
  }

  console.log({ diagnosisCodes });
  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: any): number | undefined => {
  console.log('healthCheckRating on ', healthCheckRating);
  if (!healthCheckRating) return undefined;
  if (!isHealthRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }

  return Number(healthCheckRating);
};

export {
  toNewEntry,
  toNewPatient
};