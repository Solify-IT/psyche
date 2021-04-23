import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@material-ui/core';
import createPatient from '../../api/patient';
import Patient from '../../interfaces/patient';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  paper: {
    margin: '20px',
    padding: '30px',
  },
  formControl: {
    marginTop: '16px',
    marginLeft: '15px',
    minWidth: 280,
  },
  inputLabel: {
    paddingLeft: '10px',
  },
  date: {
    marginTop: '28px',
  },
  submit: {
    textAlign: 'center',
  },
}));

function RegisterPatient() {
  const history = useHistory();
  const today = new Date();
  const [formFields, setFormFields] = useState<Patient>({
    name: '',
    middleName: '',
    lastName: '',
    startDate: today,
    type: '',
    age: NaN,
    gender: '',
    telephone: '',
    address: '',
    birthPlace: '',
    birthDate: '',
    postalCode: '',
  });
  const {
    name, middleName, lastName, type, age, gender,
    telephone, address, birthPlace, birthDate, postalCode,
  } = { ...formFields };

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    createPatient(formFields)
      .then((response:any) => {
        console.log(response);
        toast.success('¡Se ha registrado el paciente! 😃');
        history.replace('/home');
      })
      .catch((error:any) => {
        toast.warning('Algo ha salido mal!');
        console.log(error);
      });
  };

  return (
    <div className={classes.heroContent}>
      <main>
        <Container>
          <Typography variant="h2" align="center" color="secondary">
            Registrar Paciente
          </Typography>
          <form method="POST" onSubmit={handleSubmit}>
            <Grid container justify="center">

              <Grid
                item
                xs={10}
                component={Paper}
                className={classes.paper}
                elevation={6}
                justify="center"
              >

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="middleName"
                      label="Apellido Paterno"
                      name="middleName"
                      value={middleName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido Materno"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      type="number"
                      required
                      fullWidth
                      id="age"
                      label="Edad"
                      name="age"
                      value={age}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel>Género</InputLabel>
                      <Select
                        required
                        fullWidth
                        label="Género"
                        name="gender"
                        value={gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="Masculino"> Masculino </MenuItem>
                        <MenuItem value="Femenino"> Femenino </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="type"
                      label="Clasificación"
                      name="type"
                      value={type}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="birthPlace"
                      label="Lugar de Nacimiento"
                      name="birthPlace"
                      value={birthPlace}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      type="date"
                      required
                      fullWidth
                      id="birthDate"
                      label="Fecha de Nacimiento"
                      name="birthDate"
                      className={classes.date}
                      value={birthDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Domicilio"
                      name="address"
                      value={address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="postalCode"
                      label="Código Postal"
                      name="postalCode"
                      value={postalCode}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
      </main>
    </div>
  );
}

export default RegisterPatient;
