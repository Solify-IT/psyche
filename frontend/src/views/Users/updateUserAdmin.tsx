import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  makeStyles,
  Grid,
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
import { getUser, updateUser } from 'src/api/user';
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
    margin: '5px',
  },
  table: {
    padding: '10px',
  },
  rol: {
    maxWidth: '100%',
    padding: '200px',
  },
  textFields: {
    padding: '10px',
  },
  button: {
    paddingTop: '15px',
  },
}));
function UpdateUserAdmin() {
  const classes = useStyles();
  const { id } : any = useParams();
  const history = useHistory();

  const [userInformation, setUserInformation] = useState<User>({
    name: '',
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
    },
  });
  const {
    name, address, zipCode, email, role, professionalLicense,
    workSchedule,
  } = { ...userInformation };

  useEffect(() => {
    getUser(id)
      .then((response:any) => {
        setUserInformation(response.data);
        console.log(id);
      })
      .catch((error:any) => console.log(error));
  }, [id]);

  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<any>) => {
    setUserInformation({ ...userInformation, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(userInformation);
      await updateUser(parseInt(id, 10), userInformation);
      toast.success('Se ha modificado la información del usuario.');
      history.replace('/view-users');
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al intentar editar el usuario');
    } finally {
      setLoading(false);
      console.log('falso');
    }
  };
  return (
    <MainContent>

      <ContentTitle text="Editar Usuario" />
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
            <Grid item xs={12} sm={6} className={classes.textFields}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="professionalLicense"
                label="Cédula Profesional"
                name="professionalLicense"
                value={professionalLicense}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.textFields}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="workSchedule"
                label="Horarios de Trabajo"
                name="workSchedule"
                value={workSchedule}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.rol} alignItems="center">
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
          </Grid>
          <Grid container alignItems="center" justify="center" direction="row">
            <Grid item className={classes.button}>
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
export default UpdateUserAdmin;
