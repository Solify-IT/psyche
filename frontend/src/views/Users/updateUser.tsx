/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
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
import LoadingSpinner from 'src/components/loadingSpinner';
import { consultProfile, updateUser } from 'src/api/user';
import { authenticationService } from 'src/api/authenticationService';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import Swal from 'sweetalert2';

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
    margin: '5px',
  },
  table: {
    padding: '10px',
  },
}));
function UpdateUser() {
  const classes = useStyles();
  const currentUser = authenticationService.currentUserValue;
  const { userId } : any = useParams();
  const history = useHistory();

  const [userInformation, setUserInformation] = useState<User>({
    name: '',
    lastName: '',
    address: '',
    zipCode: '',
    email: '',
    username: '',
    telephone: '',
    password: '',
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
    name, lastName, address, zipCode, email, username, telephone, password, role,
    professionalLicense, workSchedule, password2, errors,
  } = { ...userInformation };

  useEffect(() => {
    consultProfile(userId)
      .then((response:any) => {
        setUserInformation(response.data);
      })
      .catch((error:any) => console.log(error));
  }, [userId]);

  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<any>) => {
    setUserInformation({ ...userInformation, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateUser(parseInt(userId, 10), userInformation);
      Swal.fire(
        '¡Perfil Actualizado!',
        'Tu información ha sido actualizado de manera correcta.',
        'success',
      );
      history.replace(`/user-profile/${currentUser.user.id}`);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error interno!',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainContent>
      <ContentTitle text={`Modificar Usuario - ${username}`} />
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                type="workSchedule"
                required
                fullWidth
                id="workSchedule"
                label="Horario de Trabajo"
                name="workSchedule"
                value={workSchedule}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="center" direction="row">
            <Grid item>
              {loading ? <LoadingSpinner /> : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Modificar
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainContent>
  );
}
export default UpdateUser;
