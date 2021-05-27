import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Footer() {
  const classes = 'footer';

  return (
    <footer className={classes}>
      <Typography variant="h5" align="center" gutterBottom>
        Psyque
      </Typography>
      <Link to="/soolers" text-decoration="none">
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
