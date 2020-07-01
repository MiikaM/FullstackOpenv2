/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

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
    console.log('req body on', req.body);
    const newPatientEntry = toNewPatientEntry(req.body);

    console.log({newPatientEntry});
    const addedEntry = patientService.addEntry(newPatientEntry);
    console.log({addedEntry});
    res.json(addedEntry);
  } catch (e) {
    res.status(404).send(e.message);
  }

  
});

export default router;