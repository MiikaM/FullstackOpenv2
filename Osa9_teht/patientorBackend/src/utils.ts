/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
  console.log('Object on ', object);
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSSN(object.ssn),
  };

};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): boolean => {
  return Object.values(Gender).includes(gender);
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

  console.log({genderEnum});

  if (!isGender(gender) || !isString(gender) || !genderEnum) {
    throw new Error('Incorrect Gender input: ' + gender);
  }

  return genderEnum;
};

const parseName = (name: any): string => {
  console.log('name on ', name);

  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseOccupation = (occupation: any): string => {
  console.log('occupation on ', occupation);

  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseSSN = (ssn: any): string => {
  console.log('ssn on ', ssn);

  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

export default toNewPatientEntry;