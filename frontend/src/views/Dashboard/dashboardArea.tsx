import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

function DasboardArea() {
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

  return (
    <MainContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ContentTitle text="Registrar Paciente" />
        </Grid>
        <Grid item xs={12}>
          <Typography align="justify" className={classes.description}>
            Selecciona el area correspondiente a la que pertenece el paciente:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Link to="/dashboard-as-psic" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/psic.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Asistencia Psicológica
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default DasboardArea;
