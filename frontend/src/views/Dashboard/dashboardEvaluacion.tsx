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

  return (
    <FadeIn>
      <main>
        <div className={classes.heroContent}>
          <Container>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Typography variant="h2" align="center" className={classes.subtitles}>
                  Evaluación
                </Typography>
              </Grid>
              <Grid item xs={false} sm={1} />
              <Grid item xs={11}>
                <Typography className={classes.description}>
                  Selecciona el grupo al que pertenece el paciente:
                </Typography>
              </Grid>
              <Grid container alignItems="center" justify="center" spacing={10}>
                <Grid item xs={12} sm={6} lg={5}>
                  <Link to="/app/land-hb-divisions" className={classes.option}>
                    <Paper className={classes.paper}>
                      <img src="/images/clinica2.png" alt="registrarPaciente" className={classes.image} />
                      <Typography variant="h4" align="center" className={classes.subtitles}>
                        Clínica
                      </Typography>
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} lg={5}>
                  <Link to="/app/land-divisions" className={classes.option}>
                    <Paper className={classes.paper}>
                      <img src="/images/forense.png" alt="Logo" className={classes.image} />
                      <Typography variant="h4" align="center" className={classes.subtitles}>
                        Forense
                      </Typography>
                    </Paper>
                  </Link>
                </Grid>

              </Grid>

            </Grid>
          </Container>
        </div>
      </main>
    </FadeIn>
  );
}

export default DashboardEvaluacion;
