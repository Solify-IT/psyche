import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

function Footer() {
  const classes = 'footer';

  const useStyles = makeStyles(() => ({
    button: {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
  }));

  const classe = useStyles();

  return (
    <footer className={classes}>
      <Typography variant="h5" align="center" gutterBottom>
        Psyque
      </Typography>
      <Link to="/soolers" className={classe.button}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          {'Soolers '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Link>
    </footer>
  );
}

export default Footer;
