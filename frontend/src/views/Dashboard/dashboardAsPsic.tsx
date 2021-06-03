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
      height: '130px',
      width: 'auto',
    },
    option: {
      textDecoration: 'none',
    },
    textPadding: {
      color: '#000000',
      paddingBottom: '26px',
      paddingTop: '26px',
    },
  }));

  const classes = useStyles();

  return (
    <MainContent>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <ContentTitle text="Áreas" />
        </Grid>

        <Grid item xs={12}>
          <Typography align="justify" className={classes.description}>
            Selecciona el área correspondiente:
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-atencion-psicologica" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/psic.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Atención Psicológica
              </Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-psiquiatrica" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/psiq.png" alt="Logo" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Atención Psiquiátrica
              </Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-evaluacion" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/pericial.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.textPadding}>
                Evaluación
              </Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-asesoria" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/asesoria.png" alt="Logo" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Asesoría Jurídica
              </Typography>
            </Paper>
          </Link>
        </Grid>

      </Grid>
    </MainContent>
  );
}

export default DasboarPsic;
