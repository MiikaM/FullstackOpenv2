/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  console.log('req id ', req.params.id);
  const patient = patientService.findById((req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {

  try {
    console.log('req body(patients) on', req.body);
    const newPatientEntry = toNewPatient(req.body);

    console.log({ newPatientEntry });
    const addedPatientEntry = patientService.addPatientEntry(newPatientEntry);
    console.log({ addedPatientEntry });
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('req query on ', req.params.id);
  const id = String(req.params.id);

  try {
    console.log('req body (entries) on', req.body);
    const newEntry = toNewEntry(req.body);
    console.log({id});
    console.log({ newEntry });
    const addedEntry = patientService.addEntry(newEntry, id);
    console.log({ addedEntry });
    res.json(addedEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default router;