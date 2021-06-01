import {
  Button,
  Card,
  CardContent, Grid, makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { canalizePatient, getPatientRecord } from 'src/api/patient';
import { getUsers } from 'src/api/user';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import Patient from 'src/interfaces/patient';
import Psychologist from 'src/interfaces/psychologist';

interface ParamTypes {
  patientId: string
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  paper: {
    margin: '20px',
    padding: '30px',
  },
  formControl: {
    marginTop: '16px',
    marginLeft: '20px',
    textAlign: 'left',
    minWidth: 285,
  },
  group: {
    margin: theme.spacing(1, 0, 3),
    textAlign: 'left',
    minWidth: 320,
  },
  inputLabel: {
    paddingLeft: '10px',
  },
  date: {
    marginTop: '28px',
    marginLeft: '10px',
  },
  place: {
    marginLeft: '20px',
  },
  submit: {
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    textAlign: 'right',
  },
  root: {
    minWidth: 275,
  },
  cards: {
    padding: theme.spacing(2, 0, 5),
  },
}));

function PatientCanalization() {
  const { patientId } = useParams<ParamTypes>();
  const history = useHistory();
  const [users, setUsers] = useState<Psychologist[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const classes = useStyles();

  useEffect(() => {
    getUsers()
      .then((response:any) => {
        setUsers(Object.values(response));
      })
      .catch((error:any) => console.log(error));
  }, []);

  useEffect(() => {
    getPatientRecord(parseInt(patientId, 10))
      .then((response:any) => {
        setPatients(Object.values(response.patients));
      })
      .catch((error:any) => console.log(error));
  }, []);

  function handleSubmit(event: React.ChangeEvent<any>) {
    const { userid } = event.currentTarget.dataset;
    patients.forEach((patient) => {
      // eslint-disable-next-line no-param-reassign
      patient.userId = parseInt(userid, 10);
    });
    canalizePatient(patients)
      .then(() => {
        toast.success('¡Canalización exitosa!');
        history.replace('/consult-patient');
      })
      .catch((error:any) => {
        toast.warning('¡Algo ha salido mal!');
        console.log(error);
      });
  }

  const doctorAreas = (patientArea:any) => (
    <Typography component="p" key={patientArea.name}>
      {patientArea.name}
    </Typography>
  );

  const createCard = (user:Psychologist) => (
    <>
      {user.patientAreas.length > 0
        ? (
          <Grid item xs={10} sm={5} key={user.id}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Nombre del Psicólogo:
                </Typography>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography className={classes.pos}>
                  <strong> Correo: </strong>
                  {' '}
                  {user.email}
                </Typography>
                <Typography component="h6">
                  Áreas:
                  {' '}
                  {user.patientAreas.map(doctorAreas)}
                </Typography>
                <div className={classes.icon}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    data-userid={user.id}
                    onClick={handleSubmit}
                  >
                    Seleccionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )
        : <></>}
    </>
  );

  return (
    <MainContent>

      <ContentTitle text="Canalizar a Paciente" />
      <Grid justify="center" alignItems="center" container spacing={3}>
        {users.map(createCard)}
      </Grid>
    </MainContent>
  );
}

export default PatientCanalization;
