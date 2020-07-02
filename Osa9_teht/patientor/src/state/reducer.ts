/* eslint-disable @typescript-eslint/no-explicit-any */
import { State } from "./state";
import { Patient } from "../types";

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
  };

export const setPatientList = (patients: Patient[]): (dispatch: any) => void => {
  return dispatch => {
    dispatch({
      type: "SET_PATIENT_LIST",
      payload: patients
    });
  };
};

export const addPatient = (patient: Patient): (dispatch: any) => void => {
  return dispatch => {
    dispatch({
      type: "ADD_PATIENT",
      payload: patient
    });
  };
};
export const setPatient = (patient: Patient): (dispatch: any) => void => {
  return dispatch => {
    dispatch({
      type: "SET_INDIVIDUAL_PATIENT",
      payload: patient
    });
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
      console.log('action payload', action.payload);
      return {
        ...state,
        patients: {
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
