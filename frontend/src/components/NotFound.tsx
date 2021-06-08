import {
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React from 'react';
import MainContent from './mainContent';

function NotFound() {
  const useStyles = makeStyles((theme) => ({
    errorContent: {
      padding: theme.spacing(1, 1, 1, 1),
      textAlign: 'center',
    },
    image: {
      height: '50%',
      width: 'auto',
    },
  }));
  const classes = useStyles();
  return (
    <MainContent>
      <Grid container>
        <Paper className={classes.errorContent}>
          <img src="/images/notFound.png" alt="NotFound" className={classes.image} />
          <Typography variant="h3" align="center">
            No se ha encontrado la ruta introducida
          </Typography>
        </Paper>
      </Grid>
    </MainContent>
  );
}

export default NotFound;
