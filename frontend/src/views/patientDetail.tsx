/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Moment from 'moment';

// import Patient from 'src/interfaces';
// import server from 'src/utils/server';
import {
  Button,
  CircularProgress,
  Fab,
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
// import handleResponse from '../utils/handleResponse';
import '../App.css';
import FadeIn from 'react-fade-in';
import { Add } from '@material-ui/icons';
import Patient from 'src/interfaces';
import { useParams } from 'react-router';

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

interface IPatientFile {
  name: string;
  detailUrl: string | null;
  modifyUrl: string | null;
}

function PatientDetail() {
  const params = useParams();
  const classes = useStyles();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line max-len
      // const results = await server.get<Patient[]>('/patients/1').then(handleResponse).catch(handleResponse);
      // setPatient(results.data);
      const initialPatient : Patient = {
        id: 1,
        name: 'Jorge Miguel Lopez',
        startDate: new Date(),
        type: 'Joven',
        costPerSession: 200.00,
        age: 30,
        gender: 'Hombre',
        telephone: '2126427',
        address: 'Argel 15, Casa blanca',
        civilStatus: 'Soltero',
        notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend viverra tristique. Vestibulum luctus tincidunt venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi posuere tortor non ultricies ullamcorper. Sed placerat dapibus leo nec laoreet. Maecenas ac ante sapien. Pellentesque volutpat, tellus nec pulvinar mattis, tortor neque aliquam nisl, eu accumsan est augue volutpat eros. In in magna egestas, posuere orci nec, dictum tellus. Pellentesque hendrerit, purus nec sagittis cursus, orci lorem semper ex, at suscipit eros diam sed nisl. Suspendisse fringilla eros est, ut aliquet risus facilisis non. Etiam mauris nulla, pharetra vitae scelerisque nec, sodales id magna. Donec sit amet augue magna. Suspendisse cursus, quam consequat fermentum finibus, arcu lacus viverra justo, sed dapibus dolor ante id libero. Praesent consequat auctor odio, mollis molestie elit consectetur id. Mauris nec ultrices ligula, vitae bibendum odio. Cras tincidunt lectus vel commodo varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In imperdiet mattis enim nec lacinia. Donec pharetra eget orci in semper. Quisque ullamcorper pretium condimentum. Nunc sed justo urna.',
      };
      setPatient(initialPatient);
    };
    fetchData();
    console.log(params);
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

  function createFileSection(title: string, files: IPatientFile[]) {
    return (
      <Paper variant="outlined" className={classes.patientSection}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography component="h3" variant="h5" className={classes.patientSectionTitle}>
              <strong>
                {title}
                :
              </strong>
            </Typography>
          </Grid>
          <Grid item>
            <Fab variant="extended" size="medium" color="primary" aria-label="add">
              <Add className={classes.extendedIcon} />
              Crear
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
              <Button variant="contained" color="primary">
                Consultar
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button variant="contained" color="secondary">
                Modificar
              </Button>
            </Grid>
          </Grid>
        ))}

      </Paper>
    );
  }

  const testDocSection : IPatientFile[] = [
    { name: 'INE', modifyUrl: null, detailUrl: null },
    { name: 'Prueba', modifyUrl: null, detailUrl: null },
  ];

  return (
    patient ? (
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
                { createInfoSlot('Nombre', patient.name.split(' ')[0]) }
                { createInfoSlot('Apellido Paterno', patient.name.split(' ')[1]) }
                { createInfoSlot('Nombre', patient.name.split(' ')[2]) }
              </Grid>
              <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
                { createInfoSlot('Folio', patient.id.toString()) }
                { createInfoSlot('Edad', patient.age.toString()) }
                { createInfoSlot('Genero', patient.gender) }
              </Grid>
              <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
                { createInfoSlot('Apoyo por sesion', `$${patient.costPerSession}`) }
                { createInfoSlot('Fecha de inicio', Moment(patient.startDate).format('DD-MM-YYYY')) }
                { createInfoSlot('Estado civil', patient.civilStatus) }
              </Grid>
              <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
                { createInfoSlot('Telefono', patient.telephone) }
                { createInfoSlot('Direccion', patient.address) }
              </Grid>
              <Grid container justify="space-between" spacing={2} className={classes.patientSectionRow}>
                <Grid item>
                  <Typography variant="body2">
                    <strong>
                      Notas:
                      {' '}
                    </strong>
                  </Typography>
                  <Typography variant="body1">
                    { patient.notes }
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            { createFileSection('Documentos', testDocSection)}
            { createFileSection('Documentos', testDocSection)}
          </Grid>
        </Grid>
      </FadeIn>
    ) : <CircularProgress />
  );
}

export default PatientDetail;
