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

function DasboarPsic() {
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
      width: '60%',
      height: 'auto',
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
                  Asistencia Psicológica
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography align="justify" className={classes.description}>
                  Selecciona el area correspondiente a la que pertenece el paciente:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Link to="/dashboard-atencion-psicologica" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/registrarPaciente.png" alt="registrarPaciente" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Atención Psicológica
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Link to="/dashboard-psiquiatrica" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/pacientes.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Atención Psiquiátrica
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Link to="/dashboard-evaluacion" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/registrarPaciente.png" alt="registrarPaciente" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Evaluación
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Link to="/dashboard-asesoria" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/pacientes.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Asesoría Jurídica
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

            </Grid>
          </Container>
        </div>
      </main>
    </FadeIn>
  );
}

export default DasboarPsic;
