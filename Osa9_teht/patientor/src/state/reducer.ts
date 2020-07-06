/* eslint-disable @typescript-eslint/no-explicit-any */
import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_INDIVIDUAL_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: any;
  };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};
export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_INDIVIDUAL_PATIENT",
    payload: patient
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry,
      id
    }
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_INDIVIDUAL_PATIENT":
      return {
        ...state,
        patients: {
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      console.log('action payload, diagnosis: ', action.payload);
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const entryTo = Object.values(state.patients).find(p => p.id === action.payload.id);
      if (!entryTo) return { ...state, patients: { ...state.patients } };
      entryTo.entries.push(action.payload.entry);

      console.log({entryTo});
      console.log('entryet', entryTo.entries);

      const newPatients = Object.values(state.patients).map(p => p.id !== entryTo.id ? p : entryTo);

      console.log({newPatients});
      return {
        ...state,
        patients: {
          ...newPatients.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        },

      };
    default:
      return state;
  }
};
