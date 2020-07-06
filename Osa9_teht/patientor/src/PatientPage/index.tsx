import React from "react";
import axios from "axios";

import { Container, Header, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import Part from '../components/EntryType';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";



const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).map((patient: Patient) => patient);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log({ values });
      const HospitalEntry = {
        type: values.type,
        discharge: {
          date: values.discharge.date,
          criteria: values.discharge.criteria
        },
        healthCheckRating: values.healthCheckRating,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes
      };
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        HospitalEntry
      );
      console.log({ newEntry });
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    console.log({ id });
    const fetchPatient = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log({ fetchedPatient });
        dispatch(setPatient(fetchedPatient));
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatient();

  }, [dispatch, id]);

  console.log({ id });
  console.log({ patients });
  console.log({ patient });
  console.log({ diagnoses });


  if (patient.length > 1 || patient.length < 1) {
    return null;
  }

  const entries = Object.values(patient[0].entries).map((entry: Entry) => entry);

  console.log({ entries });


  return (
    <div>
      <Container>
        <Header as='h1'>{patient[0].name}</Header>
        <p>gender: {patient[0].gender}</p>
        <p>ssn: {patient[0].ssn}</p>
        <p>occupation: {patient[0].occupation}</p>
        <Header as='h2'>entries</Header>
      </Container>
      {entries !== undefined ?
        entries.map((entry: Entry) =>
          <Part key={entry.id} entry={entry} />
        ) :
        null}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

    </div>
  );
};
export default PatientPage;