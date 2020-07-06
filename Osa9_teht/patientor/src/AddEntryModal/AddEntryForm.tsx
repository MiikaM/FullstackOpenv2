import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";


import { TextField, SelectField, EntryOption, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryType, HospitalEntry } from "../types";


export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.HospitalEntry, label: "Hospital" }
];


const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState("");

  const [{ diagnoses }] = useStateValue();

  console.log({ diagnoses });

  const handleType = (event: any) => {
    event.preventDefault();
    const index = event.target.options.selectedIndex;
    console.log('eventti on', event.target.options);

    setType(event.target.options[index].value);

    console.log({ type });
  };

  console.log({ type });

  return (<Formik
    initialValues={{
      type: "Hospital",
      date: "",
      specialist: "",
      description: "",
      healthCheckRating: 0,
      discharge: {
        date: "",
        criteria: ""
      }
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.type) {
        errors.type = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.discharge.date) {
        errors.discharge = requiredError;
      }
      if (!values.discharge.criteria) {
        errors.discharge = requiredError;
      }
      return errors;
    }}
  >{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
    return (
      <Form className="form ui">
        <SelectField
          id="Type"
          onChange={handleType}
          label="Type"
          name="type"
          options={entryOptions}
        />
        <Field
          label="Date"
          placeholder="YYYY-MM-DD"
          name="date"
          component={TextField}
        />
        <Field
          label="Specialist"
          placeholder="Specialist"
          name="specialist"
          component={TextField}
        />
        <DiagnosisSelection
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          diagnoses={Object.values(diagnoses)}
        />
        <Field
          label="Description"
          placeholder="Description"
          name="description"
          component={TextField}
        />
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
        <fieldset name="discharge">
          <Field
            label="DischargeDate"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="DischargeCriteria"
            placeholder=""
            name="discharge.criteria"
            component={TextField}
          />
        </fieldset>

        <Grid>
          <Grid.Column floated="left" width={5}>
            <Button type="button" onClick={onCancel} color="red">
              Cancel
                </Button>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <Button
              type="submit"
              floated="right"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
                </Button>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }}
  </Formik>
  );
};

export default AddEntryForm;