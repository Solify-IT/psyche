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

  return (
    <FadeIn>
      <main>
        <div className={classes.heroContent}>
          <Container>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Typography variant="h2" align="center" className={classes.subtitles}>
                  Atención Psicológica
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography align="justify" className={classes.description}>
                  Selecciona el grupo al que pertenece el paciente:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Link to="/app/land-hb-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/registrarPaciente.png" alt="registrarPaciente" className={classes.image} />
                    <Typography variant="h5" align="center" className={classes.subtitles}>
                      Individual Menor de Edad
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Link to="/app/land-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/pacientes.png" alt="Logo" className={classes.image} />
                    <Typography variant="h5" align="center" className={classes.textPadding}>
                      Individual Adulto
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Link to="/app/land-hb-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/registrarPaciente.png" alt="registrarPaciente" className={classes.image} />
                    <Typography variant="h5" align="center" className={classes.textPadding}>
                      Pareja
                    </Typography>
                  </Paper>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Link to="/app/land-divisions" className={classes.option}>
                  <Paper className={classes.paper}>
                    <img src="/images/pacientes.png" alt="Logo" className={classes.image} />
                    <Typography variant="h5" align="center" className={classes.textPadding}>
                      Familia
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

export default DasboardAtPsic;
