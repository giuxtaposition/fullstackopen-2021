import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import { Field, Formik, Form } from 'formik'

import {
  TextField,
  SelectField,
  EntryTypeOption,
  NumberField,
  DiagnosisSelection,
} from './EntryFormField'
import {
  EntryFormValues,
  HealthCheckRating,
  EntryType,
  NewEntry,
} from '../types'
import { useStateValue } from '../state'
import { toNewEntry } from '../utils'

interface Props {
  onSubmit: (values: NewEntry) => void
  onCancel: () => void
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
]

const initialFormValues: EntryFormValues = {
  type: EntryType.HealthCheck,
  date: '',
  description: '',
  specialist: '',
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy,
  employerName: '',
  sickLeaveStartDate: '',
  sickLeaveEndDate: '',
  dischargeDate: '',
  dischargeCriteria: '',
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={values => onSubmit(toNewEntry(values))}
      validate={values => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }

        if (values.type === EntryType.Hospital) {
          if (!values.dischargeDate || !values.dischargeCriteria) {
            errors.discharge = requiredError
          }
        }

        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError
          }
        }

        return errors
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <SelectField label='Type' name='type' options={entryTypeOptions} />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {values.type === EntryType.HealthCheck && (
              <Field
                label='Health Check Rating'
                placeholder='Health Check Rating'
                name='healthCheckRating'
                min={0}
                max={3}
                component={NumberField}
              />
            )}

            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label='Discharge Date'
                  placeholder='YYYY-MM-DD'
                  name='dischargeDate'
                  component={TextField}
                />
                <Field
                  label='Criteria for Discharge'
                  placeholder='Criteria for Discharge'
                  name='dischargeCriteria'
                  component={TextField}
                />
              </>
            )}

            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label='Employer Name'
                  placeholder='Employer Name'
                  name='employerName'
                  component={TextField}
                />
                <Field
                  label='Sick Leave Start Date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeaveStartDate'
                  component={TextField}
                />
                <Field
                  label='Sick Leave End Date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeaveEndDate'
                  component={TextField}
                />
              </>
            )}

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
