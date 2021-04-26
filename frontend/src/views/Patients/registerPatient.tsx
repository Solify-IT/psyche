import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import {
  optionsPsicologia,
  optionsPsiquiatria,
  optionsClinica,
  optionsAsesoria,
} from '../../interfaces/options';
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
    textAlign: 'left',
    minWidth: 280,
    paddingRight: '0px',
  },
  group: {
    marginLeft: '15px',
    marginBottom: '15px',
    textAlign: 'left',
    minWidth: 305,
  },
  inputLabel: {
    paddingLeft: '10px',
  },
  date: {
    marginTop: '28px',
    marginLeft: '10px',
  },
  submit: {
    textAlign: 'center',
  },
}));

interface ParamTypes {
  area: string;
  group: string;
}
interface Option {
  id: number;
  name: string;
}
function RegisterPatient() {
  const history = useHistory();
  const { area, group } = useParams<ParamTypes>();
  console.log(area);
  console.log(group);
  const today = new Date();
  const [formFields, setFormFields] = useState<Patient>({
    name: '',
    lastName: '',
    startDate: today,
    type: group,
    gender: '',
    telephone: '',
    address: '',
    birthPlace: '',
    birthDate: '',
    postalCode: '',
  });
  const {
    name, lastName, type, gender,
    telephone, address, birthPlace, birthDate, postalCode,
  } = { ...formFields };
  let options = Array<Option>();
  switch (area) {
    case 'psicologia':
      options = optionsPsicologia;
      break;
    case 'psiquiatrica':
      options = optionsPsiquiatria;
      break;
    case 'evaluacion':
      options = optionsClinica;
      break;
    case 'asesoria':
      options = optionsAsesoria;
      break;
    default:
      options = optionsPsicologia;
      break;
  }

  const createSelect = (option:any) => (
    <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>
  );
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
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      variant="outlined"
                      className={classes.group}
                    >
                      <InputLabel>Clasificación</InputLabel>
                      <Select
                        required
                        fullWidth
                        label="Clasificación"
                        name="type"
                        value={type}
                        onChange={handleChange}
                      >
                        {options.map(createSelect)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
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
                  <Grid item xs={12} sm={8}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido(s)"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
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
                      id="birthPlace"
                      label="Lugar de Nacimiento"
                      name="birthPlace"
                      value={birthPlace}
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3}>
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
