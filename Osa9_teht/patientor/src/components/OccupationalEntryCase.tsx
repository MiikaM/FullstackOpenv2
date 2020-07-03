import React, { FC } from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Table } from 'semantic-ui-react';
import DiagnosisCodeView from './DiagnosisCodeView';

const OccupationalEntryCase: FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
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
            {entry.employerName}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
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


export default OccupationalEntryCase;