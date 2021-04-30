import { Fab, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cornerFabExtended: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    height: 80,
    width: 300,
    padding: theme.spacing(2),
  },
  cornerFab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  cornerFabText: {
    marginLeft: theme.spacing(2),
  },
}));

type CornerFabProps = {
  text: string,
  link: string,
  extended: boolean,
};

function CornerFab({ text, link, extended } : CornerFabProps) {
  const classes = useStyles();

  return extended ? (
    <Fab
      variant="extended"
      className={classes.cornerFabExtended}
      color="primary"
      aria-label="add"
      size="large"
      component={Link}
      to={link}
    >
      <Add fontSize="large" />
      <Typography className={classes.cornerFabText}>
        { text }
      </Typography>
    </Fab>
  ) : (
    <Fab
      className={classes.cornerFab}
      color="primary"
      aria-label="add"
      size="large"
      component={Link}
      to={link}
    >
      <Add fontSize="large" />
    </Fab>
  );
}

export default CornerFab;
