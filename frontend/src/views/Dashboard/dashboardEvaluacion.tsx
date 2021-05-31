import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import hasPatientArea from 'src/utils/hasPatientArea';
import { authenticationService } from 'src/api/authenticationService';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

function DashboardEvaluacion() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    subtitles: {
      marginTop: '0px',
      padding: '10px',
      paddingBottom: '0px',
      color: '#000000',
    },
    description: {
      marginBottom: '10px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
  function areaList() {
    const componentList = [];
    if (hasPatientArea('Clínica', authenticationService.currentUserValue.user.areas)) {
      componentList.push(
        <Grid item xs={12} sm={6} lg={5} key="Clínica">
          <Link to="/register-patient/evaluacion/Clínica" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/clinica2.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Clínica
              </Typography>
            </Paper>
          </Link>
        </Grid>,
      );
    }

    if (hasPatientArea('Forense', authenticationService.currentUserValue.user.areas)) {
      componentList.push(
        <Grid item xs={12} sm={6} lg={5} key="Forense">
          <Link to="/register-patient/evaluacion/Forense" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/forense.png" alt="Logo" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Forense
              </Typography>
            </Paper>
          </Link>
        </Grid>,
      );
    }
    return componentList;
  }
  return (
    <MainContent>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <ContentTitle text="Evaluación" />
        </Grid>
        <Grid item xs={false} sm={1} />
        <Grid item xs={11}>
          <Typography className={classes.description}>
            {
                  areaList().length !== 0
                    ? 'Selecciona el grupo al que pertenece el paciente:'
                    : 'No se encontraron areas en las que pueda manejar.'
                }
          </Typography>
        </Grid>
        <Grid container alignItems="center" justify="center" spacing={10} />
        { areaList() }
      </Grid>
    </MainContent>
  );
}

export default DashboardEvaluacion;
