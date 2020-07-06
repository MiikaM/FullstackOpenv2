import React, { FC } from 'react';
import { OccupationalHealthcareEntry, iconColors } from '../types';
import { Table, Icon } from 'semantic-ui-react';
import DiagnosisCodeView from './DiagnosisCodeView';

const OccupationalEntryCase: FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  let color: iconColors;
  switch (entry.healthCheckRating) {
    case 0:
      color = 'red' as iconColors;
      break;
    case 1:
      color = 'green' as iconColors;
      break;
    case 2:
      color = 'yellow' as iconColors;
      break;
    case 3:
      color = 'brown' as iconColors;
      break;
    default:
      break;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {entry.date}
            <Icon className={`user md icon`} size='big' />
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
            {color ?
              <Icon className={`heart icon`} size='small' color={color} /> :
              null
            }
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};


export default OccupationalEntryCase;