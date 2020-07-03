import React from "react";
import axios from "axios";
import _ from 'lodash';

import { Container, Header, Table } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";


const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).map((patient: Patient) => patient);


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

  const DiagnosisCodeView = (diagnosisCodes: Array<Diagnosis['code']>): JSX.Element | JSX.Element[] => {
    if (!diagnosisCodes) return <div></div>;

    const diagnosisArray = Object.values(diagnosisCodes).map(d => d);
    const diagnosisCodeList = _.pick(diagnoses, diagnosisArray);

    return (
      Object.values(diagnosisCodeList).map((code) => (
        <Table.Row key={code.code}>
          <Table.Cell>
            {code.code} {code.name}
          </Table.Cell>
        </Table.Row>
      )));
  };

  return (
    <div>
      <Container>
        <Header as='h1'>{patient[0].name}</Header>
        <p>gender: {patient[0].gender}</p>
        <p>ssn: {patient[0].ssn}</p>
        <p>occupation: {patient[0].occupation}</p>
        <Header as='h2'>entries</Header>
      </Container>
      {
        entries.map((entry: Entry) => (
          <Table celled key={entry.id}>
            <Table.Body >
              <Table.Row>
                <Table.Cell>{entry.date} {entry.description}</Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Body>
              {
                entry.diagnosisCodes !== undefined ?
                  DiagnosisCodeView({ ...entry.diagnosisCodes }) :
                  null
              }
            </Table.Body>
          </Table>
        ))}

    </div>
  );
};
export default PatientPage;