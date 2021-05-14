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
import { authenticationService } from 'src/api/authenticationService';

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

  return (
    <FadeIn>
      <main>
        <div className={classes.heroContent}>
          <Container>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  <Typography variant="h2" gutterBottom>
                    Hola,
                    {' '}
                    { authenticationService.currentUserValue.user.name }
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography align="justify" className={classes.description}>
                    Para comenzar selecciona alguna de las siguientes opciones:
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={false} sm={6} />

              <Grid item xs={12} sm={6} lg={4}>
                <Link to="/dashboard-area" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/registrarPaciente.png" alt="registrarPaciente" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Registrar Paciente
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Link to="/consult-patient" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/pacientes.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Pacientes
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Link to="/app/home-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/reporte.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Generar Reporte
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Link to="/app/home-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/calendar.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Agenda Consultorios
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Link to={`/patient-profile/${currentUser.user.id}`} className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/perfil.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Mi Perfil
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Link to="/app/home-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/usuarios.png" alt="Logo" className={classes.image} />
                    <Typography variant="h4" align="center" className={classes.subtitles}>
                      Panel de Usuarios
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

export default Home;
