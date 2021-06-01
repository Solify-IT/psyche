import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import MainContent from './mainContent';

function NotFound() {
  const useStyles = makeStyles((theme) => ({
    errorContent: {
      padding: theme.spacing(6, 6, 6, 6),
      textAlign: 'center',
    },
  }));
  const classes = useStyles();
  return (
    <MainContent>
      <Paper className={classes.errorContent}>
        <Typography variant="h3">No se encontró la vista solicitada :(</Typography>
      </Paper>

    </MainContent>
  );
}

export default NotFound;
