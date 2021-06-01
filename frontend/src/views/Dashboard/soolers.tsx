import React from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

function Soolers() {
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
      minHeight: '300px',
    },
    image: {
      height: '160px',
      width: 'auto',
    },
    cardMedia: {
      paddingTop: '30px',
      height: '160px',
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

        <Grid item xs={12} sm={6}>
          <Grid item xs={12}>
            <ContentTitle text="Soolers" align="left" />
          </Grid>

          <Grid item xs={12}>
            <Typography align="justify" className={classes.description}>
              ¡Conoce al equipo Soolers, de la Familia Solify!
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={false} sm={6} />

        <Grid item xs={12} sm={4} lg={4}>
          <Paper className={classes.paper}>
            <img src="/images/ricardo.png" alt="registrarPaciente" className={classes.cardMedia} />
            <Typography variant="h6" align="center" className={classes.subtitles}>
              Ricardo Escobar Gouyonnet
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
          <Paper className={classes.paper}>
            <img src="/images/marce.jpeg" alt="Logo" className={classes.cardMedia} />
            <Typography variant="h6" align="center" className={classes.subtitles}>
              Marcela Arcos Caballero
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
          <Paper className={classes.paper}>
            <img src="/images/adriz.jpeg" alt="Logo" className={classes.cardMedia} />
            <Typography variant="h6" align="center" className={classes.subtitles}>
              Adriana Paola Salinas García
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
          <Paper className={classes.paper}>
            <img src="/images/albert.png" alt="Logo" className={classes.cardMedia} />
            <Typography variant="h6" align="center" className={classes.subtitles}>
              Alberto Castañeda Arana
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
          <Paper className={classes.paper}>
            <img src="/images/dome.png" alt="Logo" className={classes.cardMedia} />
            <Typography variant="h6" align="center" className={classes.subtitles}>
              Doménica Rentería Berrospe
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
          <Paper className={classes.paper}>
            <img src="/images/charlie.jpeg" alt="Logo" className={classes.cardMedia} />
            <Typography variant="h6" align="center" className={classes.subtitles}>
              Carlos Alfonso Sánchez Rosales
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </MainContent>
  );
}
export default Soolers;
