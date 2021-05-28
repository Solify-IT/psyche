import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import FadeIn from 'react-fade-in';
import hasPatientArea from 'src/utils/hasPatientArea';
import { authenticationService } from 'src/api/authenticationService';
import ContentTitle from 'src/components/contentTitle';

function DasboardAtPsic() {
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
    textPadding: {
      color: '#000000',
      paddingBottom: '21px',
      paddingTop: '21px',
    },

  }));

  const classes = useStyles();
  function areaList() {
    const componentList = [];
    if (hasPatientArea('Psicología Menor de Edad', authenticationService.currentUserValue.user.areas)) {
      componentList.push(
        <Grid item xs={12} sm={6} lg={3} key="Psicología Menor de Edad">
          <Link to="/register-patient/psicologia/Psicología Menor de Edad" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/menorEdad.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h5" align="center" className={classes.subtitles}>
                Individual Menor de Edad
              </Typography>
            </Paper>
          </Link>
        </Grid>,
      );
    }

    if (hasPatientArea('Psicología Adulto', authenticationService.currentUserValue.user.areas)) {
      componentList.push(
        <Grid item xs={12} sm={6} lg={3} key="Psicología Adulto">
          <Link to="/register-patient/psicologia/Psicología Adulto" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/adulto2.png" alt="Logo" className={classes.image} />
              <Typography variant="h5" align="center" className={classes.textPadding}>
                Individual Adulto
              </Typography>
            </Paper>
          </Link>
        </Grid>,
      );
    }

    if (hasPatientArea('Psicología Familia', authenticationService.currentUserValue.user.areas)) {
      componentList.push(
        <Grid item xs={12} sm={6} lg={3} key="Psicología Familia">
          <Link to="/register-patient/psicologia/Psicología Familia" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/familia.png" alt="Logo" className={classes.image} />
              <Typography variant="h5" align="center" className={classes.textPadding}>
                Familia
              </Typography>
            </Paper>
          </Link>
        </Grid>,
      );
    }

    if (hasPatientArea('Psicología Pareja', authenticationService.currentUserValue.user.areas)) {
      componentList.push(
        <Grid item xs={12} sm={6} lg={3} key="Psicología Pareja">
          <Link to="/register-patient/psicologia/Psicología Pareja" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/pareja.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h5" align="center" className={classes.textPadding}>
                Pareja
              </Typography>
            </Paper>
          </Link>
        </Grid>,
      );
    }
    return componentList;
  }
  return (
    <FadeIn>
      <main>
        <div className={classes.heroContent}>
          <Container>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <ContentTitle text="Atención Psicológica" />
              </Grid>

              <Grid item xs={12}>
                <Typography align="justify" className={classes.description}>
                  {
                  areaList().length !== 0
                    ? 'Selecciona el grupo al que pertenece el paciente:'
                    : 'No se encontraron areas en las que pueda manejar.'
                }
                </Typography>
              </Grid>
              { areaList() }
            </Grid>
          </Container>
        </div>
      </main>
    </FadeIn>
  );
}

export default DasboardAtPsic;
