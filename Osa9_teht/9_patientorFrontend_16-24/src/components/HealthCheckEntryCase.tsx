import React, { FC } from 'react';
import { HealthCheckEntry, iconColors } from '../types';
import { Table, Icon } from 'semantic-ui-react';
import DiagnosisCodeView from './DiagnosisCodeView';




const HealthCheckEntryCase: FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
            <Icon className={`stethoscope icon`} size='big' />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {entry.description}
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
            }          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};


export default HealthCheckEntryCase;