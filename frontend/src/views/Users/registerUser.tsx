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
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  paper: {
    margin: '20px',
    padding: '30px',
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
    lastName: '',
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
    name, lastName, username, email, address, zipCode, telephone, password, role,
    professionalLicense, workSchedule, password2, errors,
  } = { ...newUser };

  const classes = useStyles();

  function validPassword(passwordV: string) : boolean {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return strongRegex.test(passwordV);
  }

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
    try {
      const usernameUser = await getUser(usernameValidate);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function emailExist(emailValidate: string): Promise<boolean> {
    try {
      const emailUser = await getUserByEmail(emailValidate);
      return true;
    } catch (error) {
      return false;
    }
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
    if (await usernameExist(newUserV.username)) {
      toast.warning('El nombre de usuario ya esta ocupado, intente con otro');
    }
    if (!validPassword(newUserV.password)) {
      toast.warning('La contraseña debe ser mayor a 8 carácteres y contener al menos una minúscula, una mayúscula, un número y un carácter especial');
    }

    await CreateUser(newUser).then((response:any) => {
      Swal.fire(
        '¡Usuario Registrado!',
        'El usuario ha sido registrado y podrá acceder a partir de este momento.',
        'success',
      );
      history.replace('/view-users');
    });

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
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  value={lastName}
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
              <Grid item xs={12} sm={6}>
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
