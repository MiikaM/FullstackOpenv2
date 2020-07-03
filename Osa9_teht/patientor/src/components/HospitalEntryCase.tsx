import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import DiagnosisCodeView from './DiagnosisCodeView';
import { HospitalEntry } from '../types';

const HospitalEntryCase: FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {entry.date} {entry.type}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {entry.description}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            {entry.discharge.date} - {entry.discharge.criteria}
          </Table.Cell>
        </Table.Row>
        {
          entry.diagnosisCodes !== undefined ?
            DiagnosisCodeView({ ...entry.diagnosisCodes }) :
            null
        }
        <Table.Row>
          <Table.Cell>
            {entry.healthCheckRating}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};


export default HospitalEntryCase;