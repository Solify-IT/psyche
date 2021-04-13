import React from 'react';
import Typography from '@material-ui/core/Typography';

function Footer() {
  const classes = 'footer';

  return (
    <footer className={classes}>
      <Typography variant="h5" align="center" gutterBottom>
        Psyque
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        Soolers
        {new Date().getFullYear()}
        .
      </Typography>
    </footer>
  );
}

export default Footer;
