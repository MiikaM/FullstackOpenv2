/* eslint-disable @typescript-eslint/no-explicit-any */
import { State } from "./state";
import { Patient, Diagnosis } from "../types";

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
            (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
