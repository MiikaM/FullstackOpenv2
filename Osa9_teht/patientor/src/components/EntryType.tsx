import React, { FC } from "react";
import { Entry } from "../types";
import HospitalEntryCase from './HospitalEntryCase';
import OccupationalEntryCase from './OccupationalEntryCase';
import HealthCheckEntryCase from './HealthCheckEntryCase';


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: FC<{ entry: Entry }> = ({ entry }) => {

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryCase entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryCase entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryCase entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default Part;