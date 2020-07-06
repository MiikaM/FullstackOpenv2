/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById((req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {

  try {
    const newPatientEntry = toNewPatient(req.body);

    const addedPatientEntry = patientService.addPatientEntry(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = String(req.params.id);

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default router;