import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import { authenticationService } from 'src/api/authenticationService';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import withRole from 'src/utils/withRole';
import UserRole from 'src/fixtures/roles';

function Home() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    description: {
      marginTop: '30px',
    },
    subtitles: {
      marginTop: '0px',
      padding: '20px',
      color: '#000000',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '260px',
    },
    image: {
      height: '130px',
      width: 'auto',
    },
    option: {
      textDecoration: 'none',
    },

  }));

  const classes = useStyles();
  const currentUser = authenticationService.currentUserValue;
  const { name } = authenticationService.currentUserValue.user;
  const greeting = (name === undefined) ? 'Hola' : `Hola, ${name}`;

  const registerPatient = withRole(
    [
      UserRole.Administrador,
    ],
  )(
    <Grid item xs={12} sm={6} lg={4}>
      <Link to="/dashboard-area" className={classes.option}>
        <Paper className={classes.paper}>
          <img src="/images/registrarPaciente.png" alt="registrarPaciente" className={classes.image} />
          <Typography variant="h4" align="center" className={classes.subtitles}>
            Registrar Paciente
          </Typography>
        </Paper>
      </Link>
    </Grid>,
  );

  const usersList = withRole(
    [
      UserRole.Administrador,
    ],
  )(
    <Grid item xs={12} sm={6} lg={4}>
      <Link to="/view-users" className={classes.option}>
        <Paper className={classes.paper}>
          <img src="/images/usuarios.png" alt="Logo" className={classes.image} />
          <Typography variant="h4" align="center" className={classes.subtitles}>
            Panel de Usuarios
          </Typography>
        </Paper>
      </Link>
    </Grid>,
  );

  const patientsList = withRole(
    [
      UserRole.Administrador,
      UserRole.Psicólogo,
    ],
  )(
    <Grid item xs={12} sm={6} lg={4}>
      <Link to="/consult-patient" className={classes.option}>
        <Paper className={classes.paper}>
          <img src="/images/pacientes.png" alt="Logo" className={classes.image} />
          <Typography variant="h4" align="center" className={classes.subtitles}>
            Pacientes
          </Typography>
        </Paper>
      </Link>
    </Grid>,
  );

  const newForm = withRole(
    [
      UserRole.Administrador,
      UserRole.Psicólogo,
      UserRole.Becario,
    ],
  )(
    <Grid item xs={12} sm={6} lg={4}>
      <Link to="/new-form" className={classes.option}>
        <Paper className={classes.paper}>
          <img src="/images/reporte.png" alt="Logo" className={classes.image} />
          <Typography variant="h4" align="center" className={classes.subtitles}>
            Crear nueva encuesta
          </Typography>
        </Paper>
      </Link>
    </Grid>,
  );

  const myProfile = withRole([
    UserRole.Administrador,
    UserRole.Becario,
    UserRole.Psicólogo,
  ])(
    <Grid item xs={12} sm={6} lg={4}>
      <Link to={`/user-profile/${currentUser.user.id}`} className={classes.option}>
        <Paper className={classes.paper}>
          <img src="/images/perfil.png" alt="Logo" className={classes.image} />
          <Typography variant="h4" align="center" className={classes.subtitles}>
            Mi Perfil
          </Typography>
        </Paper>
      </Link>
    </Grid>,
  );

  const listForms = withRole(
    [
      UserRole.Administrador,
      UserRole.Psicólogo,
      UserRole.Becario,
    ],
  )(
    <Grid item xs={12} sm={6} lg={4}>
      <Link to="/view-forms" className={classes.option}>
        <Paper className={classes.paper}>
          <img src="/images/reporte.png" alt="Logo" className={classes.image} />
          <Typography variant="h4" align="center" className={classes.subtitles}>
            Ver encuestas
          </Typography>
        </Paper>
      </Link>
    </Grid>,
  );

  return (
    <MainContent>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <Grid item xs={12}>
            <ContentTitle text={greeting} align="left" />
          </Grid>

          <Grid item xs={12}>
            <Typography align="justify" className={classes.description}>
              Para comenzar selecciona alguna de las siguientes opciones:
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        { registerPatient }
        { patientsList }
        { newForm }
        { listForms }
        { myProfile }
        { usersList }
      </Grid>
    </MainContent>
  );
}

export default Home;
