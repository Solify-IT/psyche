import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import '../App.css';
import { makeStyles } from '@material-ui/core';

function Navbar() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navBar: {
      background: '#C94B72',
    },
    button: {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    showBar: {
      color: '#432918',
      textDecoration: 'none',
    },
    logo: {
      width: '120px',
      height: 'auto',
      paddingTop: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <nav>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link to="/">
                <img src="/images/logo.png" alt="logo of Psyque" className={classes.logo} />
              </Link>
            </Typography>
            <Link to="/" className={classes.button}><Button className={classes.button}>Opcion 1</Button></Link>
            <Link to="/" className={classes.button}><Button className={classes.button}>Opcion 2</Button></Link>
            <Link to="/" className={classes.button}><Button className={classes.button}>Opcion 3</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  );
}

export default Navbar;
