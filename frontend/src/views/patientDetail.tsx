/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Moment from 'moment';

import server from 'src/utils/server';
import {
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import '../App.css';
import FadeIn from 'react-fade-in';
import Patient from 'src/interfaces';
import { useParams } from 'react-router-dom';
import LoadingSpinner from 'src/components/loadingSpinner';
// import handleResponse from '../utils/handleResponse';

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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function PatientDetail() {
  const { id } : any = useParams();
  const classes = useStyles();
  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await server.get<Patient>(`/patients/${id}`);
        setPatient(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  /*
  function createFileSection(files: UploadedFile[]) {
    const SERVER_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

    return (
      <Paper variant="outlined" className={classes.patientSection}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography component="h3" variant="h5" className={classes.patientSectionTitle}>
              <strong>
                Documentos
                :
              </strong>
            </Typography>
          </Grid>
          <Grid item>
            <Fab variant="extended" size="medium" color="primary" aria-label="add">
              <Add className={classes.extendedIcon} />
              Agregar
            </Fab>
          </Grid>
        </Grid>
        { files.map((file) => (
          <Grid container spacing={2} className={classes.patientFileRow}>
            <Grid item md={6}>
              <Typography>
                {file.name}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography component="h3" variant="h5">
                { Moment(file.createdDate).format('DD-MM-YYYY')}
              </Typography>
            </Grid>
            <Grid item md={3}>
              // eslint-disable-next-line max-len
              <Button variant="contained" color="primary"
              onClick={() => window.open(`${SERVER_URL}${file.fileUrl}`)}>
                Consultar
              </Button>
            </Grid>
          </Grid>
        ))}

      </Paper>
    );
  }
*/

  if (loading) {
    return <LoadingSpinner />;
  }
  if (patient) {
    return (
      <FadeIn>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h1" variant="h3" className={classes.title}>
              Expediente de
              {' '}
              { patient.name }
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
          </Grid>
        </Grid>
      </FadeIn>
    );
  }
  return <h1>No se encontro al paciente</h1>;
}

export default PatientDetail;
