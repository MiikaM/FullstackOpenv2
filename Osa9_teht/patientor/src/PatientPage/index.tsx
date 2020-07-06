import React from "react";
import axios from "axios";

import { Container, Header, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry, } from "../state";
import Part from '../components/EntryType';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import GenderIcon from "../components/GenderIcon";



const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [{ diagnoses }] = useStateValue();

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

    if (patient === null || patient.id !== id ) {
      fetchPatient();
    }

  }, [dispatch]);

  console.log({ id });
  console.log({ patient });
  console.log({ diagnoses });


  if (!patient) {
    return null;
  }

  const entries = Object.values(patient.entries).map((entry: Entry) => entry);

  console.log({ entries });


  return (
    <div>
      <Container>
        <Header as='h1'>
          {patient.name}
          <GenderIcon gender={patient.gender} />
        </Header>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
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