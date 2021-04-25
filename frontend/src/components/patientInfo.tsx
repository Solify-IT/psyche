import React from 'react';
import {
  Button,
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import Moment from 'moment';
import FadeIn from 'react-fade-in';
import Patient from 'src/interfaces';
import CornerFab from 'src/components/cornerFab';
import IPatientForm from 'src/interfaces/patientForm';
import groupBy from 'src/utils/groupBy';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  patientSection: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#C94B72',
    borderRadius: 20,
    padding: theme.spacing(2, 6),
  },
  patientSectionTitle: {
    marginBottom: 20,
  },
  patientSectionRow: {
    margin: theme.spacing(1, 0),
  },
  patientFileRow: {
    margin: theme.spacing(2, 0),
  },
  title: {
    color: '#C94B72',
    textAlign: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    height: 80,
    width: 80,
  },
}));

type PatientInfoProps = {
  patient: Patient
};

function PatientInfo(props: PatientInfoProps) {
  const classes = useStyles();
  const { patient } = props;

  function createInfoSlot(label: string, value: string) {
    return (
      <Grid item>
        <Typography variant="body2">
          <strong>
            {label}
            :
            {' '}
          </strong>
          {value}
        </Typography>
      </Grid>
    );
  }

  function createFormSection(title: string, forms: IPatientForm[]) {
    return (
      <Paper key={title} variant="outlined" className={classes.patientSection}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography component="h2" variant="h5" className={classes.patientSectionTitle}>
              <strong>
                { title }
              </strong>
            </Typography>
          </Grid>
        </Grid>
        { forms.map((form) => (
          <Grid justify="space-between" key={form.id} container spacing={2} className={classes.patientFileRow}>
            <Grid item md={6}>
              <Typography component="h3" variant="h5">
                {form.name}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography component="h4" variant="h5">
                { Moment(form.createdDate).format('DD-MM-YYYY')}
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Button variant="contained" color="primary">
                Consultar
              </Button>
            </Grid>
            <Grid item md={1}>
              <Button variant="contained" color="secondary">
                Modificar
              </Button>
            </Grid>
          </Grid>
        ))}
      </Paper>
    );
  }

  function createFormsGroup(forms: IPatientForm[]) {
    const groupedForms = groupBy(forms, (form) => form.name);
    const formElements : JSX.Element[] = [];
    Object.keys(groupedForms).forEach((key) => {
      formElements.push(createFormSection(key, groupedForms[key]));
    });
    return formElements;
  }

  return (
    <FadeIn>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography component="h1" variant="h3" className={classes.title}>
            Expediente de:
            { ` ${patient.name} ${patient.middleName} ${patient.lastName}` }
          </Typography>
          <Paper variant="outlined" className={classes.patientSection}>
            <Typography component="h3" variant="h5" className={classes.patientSectionTitle}>
              <strong>Informacion general:</strong>
            </Typography>
            <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
              { createInfoSlot('Nombre', patient.name) }
              { createInfoSlot('Apellido Paterno', patient.middleName) }
              { createInfoSlot('Nombre', patient.lastName) }
            </Grid>
            <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
              { createInfoSlot('Folio', patient.id.toString()) }
              { createInfoSlot('Edad', patient.age.toString()) }
              { createInfoSlot('Genero', patient.gender) }
            </Grid>
            <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
              { createInfoSlot('Tipo de paciente', patient.type) }
              { createInfoSlot('Fecha de inicio', Moment(patient.startDate).format('DD-MM-YYYY')) }
              { createInfoSlot('Telefono', patient.telephone) }
            </Grid>
            <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
              { createInfoSlot('Lugar de nacimiento', patient.birthPlace) }
              { createInfoSlot('Direccion', patient.address) }
              { createInfoSlot('Codigo Postal', patient.postalCode) }
            </Grid>
          </Paper>
          { createFormsGroup(patient.forms) }
        </Grid>
      </Grid>
      <CornerFab extended text="Agregar formato" link="" />
    </FadeIn>
  );
}

export default PatientInfo;
