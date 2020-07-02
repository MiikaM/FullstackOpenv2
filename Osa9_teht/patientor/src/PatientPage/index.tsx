import React, { useState } from "react";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";


const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).map((patient: Patient) => patient);
  React.useEffect(() => {
    console.log({ id });
    const fetchPatient = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log({ fetchedPatient });
        dispatch({ type: "SET_INDIVIDUAL_PATIENT", payload: fetchedPatient });
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatient();

  }, [id]);

  console.log({ id });
  console.log({ patients });
  console.log({ patient });

  if (patient.length > 1 || patient.length < 1) {
    return null;
  }

  return (
    <div>
      <Container>
        <Header as='h1'>{patient[0].name}</Header>
        <p>gender: {patient[0].gender}</p>
        <p>ssn: {patient[0].ssn}</p>
        <p>occupation: {patient[0].occupation}</p>
      </Container>
    </div>
  );
};
export default PatientPage;