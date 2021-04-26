import React from 'react';
import {
  Button,
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import Moment from 'moment';
import FadeIn from 'react-fade-in';
import Patient from 'src/interfaces';
import CornerFab from 'src/components/cornerFab';
import PatientForm from 'src/interfaces/patientForm';
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

type PatientInfoSlotProps = {
  label: string,
  value: string,
};

type FormSectionProps = {
  title: string,
  forms: PatientForm[],
};

function PatientInfoSlot(infoProps: PatientInfoSlotProps) {
  const { label, value } = infoProps;
  return (
    <Grid item>
      <Typography variant="body2">
        <strong>
          { label}
          :
          {' '}
        </strong>
        { value}
      </Typography>
    </Grid>
  );
}
function FormSection(props: FormSectionProps) {
  const classes = useStyles();
  const { forms, title } = props;
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

function PatientInfo(props: PatientInfoProps) {
  const classes = useStyles();
  const { patient } = props;
  const formsGrouped = groupBy(patient.forms, (form) => form.name);
  const formKeys = Object.keys(formsGrouped);

  function PatientGeneralInfo() {
    return (
      <Paper variant="outlined" className={classes.patientSection}>
        <Typography component="h3" variant="h5" className={classes.patientSectionTitle}>
          <strong>Información general:</strong>
        </Typography>
        <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
          <PatientInfoSlot label="Nombre" value={patient.name} />
          <PatientInfoSlot label="Apellido Paterno" value={patient.middleName} />
          <PatientInfoSlot label="Apellido Materno" value={patient.lastName} />
        </Grid>
        <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
          <PatientInfoSlot label="Folio" value={patient.id.toString()} />
          <PatientInfoSlot label="Edad" value={patient.age.toString()} />
          <PatientInfoSlot label="Genero" value={patient.gender} />
        </Grid>
        <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
          <PatientInfoSlot label="Tipo de paciente" value={patient.type} />
          <PatientInfoSlot label="Fecha de inicio" value={Moment(patient.startDate).format('DD-MM-YYYY')} />
          <PatientInfoSlot label="Telefono" value={patient.telephone} />
        </Grid>
        <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
          <PatientInfoSlot label="Lugar de nacimiento" value={patient.birthPlace} />
          <PatientInfoSlot label="Direccion" value={patient.address} />
          <PatientInfoSlot label="Codigo Postal" value={patient.postalCode} />
        </Grid>
      </Paper>
    );
  }

  return (
    <FadeIn>
      <Grid container component="main" className={classes.root}>
        <Grid item md={12}>
          <Typography component="h1" variant="h3" className={classes.title}>
            Expediente de:
            { ` ${patient.name} ${patient.middleName} ${patient.lastName}` }
          </Typography>
          <PatientGeneralInfo />
          { formKeys.map((key) => (
            <FormSection key={key} title={key} forms={formsGrouped[key]} />
          ))}
        </Grid>
      </Grid>
      <CornerFab extended text="Agregar formato" link="" />
    </FadeIn>
  );
}

export default PatientInfo;
