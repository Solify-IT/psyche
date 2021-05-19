/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
}
  from '@material-ui/core';
import User from 'src/interfaces/user';
import { toast } from 'react-toastify';
import CreateUser from 'src/api/user';
import roles from 'src/fixtures/roles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  paper: {
    marginTop: '20px',
    padding: theme.spacing(12, 12),
  },
  submit: {
    textAlign: 'center',
  },
  table: {
    padding: '10px',
  },
  rol: {
    maxWidth: '100%',
  },
}));
function RegisterUser() {
  const history = useHistory();

  const [newUser, setNewUser] = useState<User>({
    username: '',
    name: '',
    address: '',
    telephone: '',
    zipCode: '',
    password: '',
    email: '',
    role: '',
    password2: '',
    errors: {
      password: '',
    },
  });
  const {
    name, username, email, address, zipCode, telephone, password, role, password2,
    errors,
  } = { ...newUser };

  const classes = useStyles();

  const isPasswordValid = () => {
    if (!password || !password2) return false;
    return password === password2;
  };

  const handleChange = (event: React.ChangeEvent<any>) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { errors } = newUser;
    if (newUser.password !== newUser.password2) {
      errors.password = 'Las contraseñas no coinciden';
    } else {
      errors.password = '';
    }
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
      errors,
    });

    console.log(newUser);
  };

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    let passwordError = '';
    if (password2 !== password) {
      passwordError = 'Las contraseñas no coinciden';
      console.log(passwordError);
    } else {
      CreateUser(newUser).then((response:any) => {
        console.log(response);
        toast.success('Se ha registrado el nuevo usuario');
        history.replace('/home');
      })
        .catch((error:any) => {
          toast.warning('No se pudo registrar al usuario');
          console.log(error);
        });
    }
  };

  return (
    <div className={classes.heroContent}>
      <Container>
        <Typography variant="h2" align="center">
          Registrar Usuario
        </Typography>
        <form method="POST" onSubmit={handleSubmit}>
          <Grid
            container
            justify="center"
            spacing={2}
          >
            <Grid
              item
              xs={10}
              component={Paper}
              className={classes.paper}
              elevation={6}
              square
            >
              <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Dirección"
                    name="address"
                    value={address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    inputProps={{ maxLength: 5, minLength: 5 }}
                    margin="normal"
                    required
                    fullWidth
                    id="zipCode"
                    label="Código Postal"
                    name="zipCode"
                    value={zipCode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    inputProps={{ maxLength: 10, minLength: 10 }}
                    margin="normal"
                    required
                    fullWidth
                    id="telephone"
                    label="Teléfono"
                    name="telephone"
                    value={telephone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="Correo"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    inputProps={{ minLength: 5 }}
                    required
                    fullWidth
                    id="username"
                    label="Usuario"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="password"
                    inputProps={{ minLength: 8 }}
                    required
                    fullWidth
                    id="password"
                    label="Contraseña"
                    name="password"
                    error={Boolean(errors?.password)}
                    helperText={(errors?.password)}
                    value={newUser.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    inputProps={{ minLength: 8 }}
                    margin="normal"
                    type="password"
                    required
                    fullWidth
                    id="password2"
                    value={newUser.password2}
                    label="Repetir Contraseña"
                    name="password2"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4} className={classes.rol} alignItems="center">
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    required
                    labelId="role-select"
                    fullWidth
                    id="role-select"
                    name="role"
                    value={role}
                    onChange={handleChange}
                  >
                    { Object.keys(roles).map((roleOption) => (
                      <MenuItem value={roleOption} key={roleOption}>
                        {roleOption}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} className={classes.submit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Registrar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>

  );
}
export default RegisterUser;
