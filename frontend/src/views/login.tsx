import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import FadeIn from 'react-fade-in';
import { useHistory } from 'react-router-dom';
import { authenticationService, login } from '../api/authenticationService';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  image: {
    backgroundImage: 'url(/images/loginImage.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '30%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
}));
export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  });
  const { username, password } = { ...formFields };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser) {
    history.replace('/patients');
  }

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    login(username, password)
      .then((response) => {
        console.log(response);
        toast.success('Se ha iniciado sesión 😃');
        history.replace('/home');
      })
      .catch((error) => {
        toast.warning('¡Usuario y/o contraseña incorrectos!');
        console.log(error);
      });
  };
  return (
    <FadeIn>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h3">
              Inicia Sesión
            </Typography>
            <form className={classes.form} method="POST" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="username"
                value={username}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Ingresar
              </Button>

              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href="/#" variant="body2">
                    Olvide mi contraseña
                  </Link>
                </Grid>
              </Grid>

            </form>
          </div>
        </Grid>
      </Grid>
    </FadeIn>
  );
}
