import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    minHeight: '80vh',
    flex: 1,
  },
}));
function LoadingSpinner() {
  const classes = useStyles();

  return (
    <Container className={classes.loading}>
      <CircularProgress size={100} />
    </Container>
  );
}

export default LoadingSpinner;
