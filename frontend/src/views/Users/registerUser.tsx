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
import { CreateUser, getUser, getUserByEmail } from 'src/api/user';
import roles from 'src/fixtures/roles';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

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
    professionalLicense: '',
    workSchedule: '',
    password2: '',
    errors: {
      password: '',
      username: '',
      email: '',
    },
  });
  const {
    name, username, email, address, zipCode, telephone, password, role, professionalLicense,
    workSchedule, password2, errors,
  } = { ...newUser };

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<any>) => {
    const newUserV: User = {
      ...newUser,
      [event.target.name]: event.target.value,
    };
    setNewUser(newUserV);

    if (newUserV.password !== newUserV.password2) {
      errors.password = 'Las contraseñas no coinciden';
    } else {
      errors.password = '';
    }
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
      errors,
    });
  };

  async function usernameExist(usernameValidate: string): Promise<boolean> {
    const usernameUser = await getUser(usernameValidate);
    if (usernameUser) {
      console.log('espera');
      return true;
    }
    return false;
    /*
    console.log(usernameUser);
    const isRegistered: boolean = false;
    getUser(usernameValidate).then((responses:any) => {
      errors.username = 'Usuario ocupado';
      console.log('retornará true');
      return !isRegistered;
    }).catch((error:any) => {
      errors.username = '';
      console.log('retornará false');
      return isRegistered;
    });
    return isRegistered; */
  }

  async function emailExist(emailValidate: string): Promise<boolean> {
    const emailUser = await getUserByEmail(emailValidate);
    if (emailUser) {
      return true;
    }
    console.log('no pasa');
    return false;

    /*
    await getUserByEmail(emailValidate).then((responses:any) => {
      errors.email = 'Email ocupado';
      return true;
    }).catch((error:any) => {
      errors.email = '';
      return false;
    });
    return false; */
  }

  const handleSubmit = async (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const newUserV: User = {
      ...newUser,
      [event.target.name]: event.target.value,
    };
    setNewUser(newUserV);
    let passwordError = '';
    if (password2 !== password) {
      passwordError = 'Las contraseñas no coinciden';
    }
    if (await emailExist(newUserV.email)) {
      toast.warning('El correo electrónico ya esta ocupado, intente con otro');
    }
    if (usernameExist(newUserV.username)) {
      console.log('ok');
      toast.warning('El nombre de usuario ya esta ocupado, intente con otro');
    } else {
      await CreateUser(newUser).then((response:any) => {
        toast.success('Se ha registrado el nuevo usuario');
        history.replace('/home');
      })
        .catch((error:any) => {
          toast.warning('Ha ocurrido un error y/o algún dato ya existe en el sistema');
        });
    }
    setNewUser({
      ...newUserV,
      errors,
    });
  };

  return (
    <MainContent>
      <ContentTitle text="Registrar Usuario" />
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
    </MainContent>

  );
}
export default RegisterUser;
