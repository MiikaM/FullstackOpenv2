
import React from "react";
import _ from 'lodash';
import { useStateValue } from "../state";

import { Table } from "semantic-ui-react";

import { Diagnosis } from "../types";


const DiagnosisCodeView = (diagnosisCodes: Array<Diagnosis['code']>): JSX.Element | JSX.Element[] => {
  const [{ diagnoses }] = useStateValue();


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

export default DiagnosisCodeView;