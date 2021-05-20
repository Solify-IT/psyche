import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  FormControl,
  Button,
} from '@material-ui/core';
import {
  optionsPsicologia,
  optionsPsiquiatria,
  optionsClinica,
  optionsAsesoria,
} from '../../interfaces/options';
import { createPatient, createCouple } from '../../api/patient';
import Patient from '../../interfaces/patient';
import RegisterCouple from './registerCouple';
import RegisterFamily from './registerFamily';
import ViewCouple from './viewCouple';

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
    marginLeft: '20px',
    textAlign: 'left',
    minWidth: 285,
  },
  group: {
    margin: theme.spacing(1, 0, 3),
    textAlign: 'left',
    minWidth: 320,
  },
  inputLabel: {
    paddingLeft: '10px',
  },
  date: {
    marginTop: '28px',
    marginLeft: '10px',
  },
  place: {
    marginLeft: '20px',
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
  const { area, group } = useParams<ParamTypes>();
  const today = new Date();
  const history = useHistory();
  const [formFields, setFormFields] = useState<Patient>({
    name: '',
    lastName: '',
    startDate: today,
    type: group,
    gender: '',
    telephone: '',
    address: '',
    birthPlace: '',
    postalCode: 2222,
    birthDate: ' ',
    recordId: 1,
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
    setFormFields({ ...formFields, [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value });
  };
  const [step, setStep] = useState(1);
  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    if (name === '' || lastName === '' || type === '' || gender === ''
      || telephone === '' || address === '' || birthPlace === '' || birthDate === '' || postalCode.toString() === '') {
      toast.warning('¡Completar todos los campos!');
    } else {
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
    }
  };

  function nextStep() {
    setStep(step + 1);
  }
  function previousStep() {
    setStep(step - 1);
  }
  function prevPreviousStep() {
    setStep(step - 2);
  }
  const [patientOne, setPatientOne] = useState<Patient>({
    name: '',
    lastName: '',
    startDate: today,
    type: group,
    gender: '',
    telephone: '',
    address: '',
    birthPlace: '',
    birthDate: '',
    postalCode: 0,
    recordId: 1,
  });
  const [patientTwo, setPatientTwo] = useState<Patient>({
    name: '',
    lastName: '',
    startDate: today,
    type: group,
    gender: '',
    telephone: '',
    address: '',
    birthPlace: '',
    birthDate: '',
    postalCode: 0,
    recordId: 1,
  });
  const handlePatientOne = (event: React.ChangeEvent<any>) => {
    setPatientOne({ ...patientOne, [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value });
  };
  const handlePatientTwo = (event: React.ChangeEvent<any>) => {
    setPatientTwo({ ...patientTwo, [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value });
  };
  const submitPatients = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    if (patientOne.name === '' || patientOne.lastName === '' || patientOne.gender === ''
      || patientOne.telephone === '' || patientOne.address === '' || patientOne.birthPlace === '' || patientOne.birthDate === '' || postalCode.toString() === '') {
      toast.warning('¡Completar datos del paciente uno!');
    } else if (patientTwo.name === '' || patientTwo.lastName === '' || patientTwo.gender === ''
    || patientTwo.telephone === '' || patientTwo.address === '' || patientTwo.birthPlace === '' || patientTwo.birthDate === '' || postalCode.toString() === '') {
      toast.warning('¡Completar datos del paciente dos!');
    } else {
      const array = Array<Patient>();
      array.push(patientOne);
      array.push(patientTwo);
      createCouple(array)
        .then((response:any) => {
          console.log(response);
          toast.success('¡Se han registrado los pacientes! 😃');
          history.replace('/home');
        })
        .catch((error:any) => {
          toast.warning('Algo ha salido mal!');
          console.log(error);
        });
    }
  };
  function renderPatient() {
    if (type === 'Psicología Familia') { return (<RegisterFamily />); }
    switch (step) {
      case 1:
        return (
          <RegisterCouple
            previousStep={previousStep}
            nextStep={nextStep}
            step={step}
            patient={patientOne}
            handlePatient={handlePatientOne}
          />
        );
      case 2:
        return (
          <RegisterCouple
            previousStep={previousStep}
            nextStep={nextStep}
            step={step}
            patient={patientTwo}
            handlePatient={handlePatientTwo}
          />
        );
      case 3:
        return (
          <ViewCouple
            previousStep={previousStep}
            prevPreviousStep={prevPreviousStep}
            patientOne={patientOne}
            patientTwo={patientTwo}
            submitPatients={submitPatients}
          />
        );
      default:
        return (
          <div>Te queremos Caro :D</div>
        );
    }
  }

  return (
    <div className={classes.heroContent}>
      <main>
        <Container>
          <Typography variant="h2" align="center" color="secondary">
            Registrar Paciente
          </Typography>
          {type === 'Psicología Familia' || type === 'Psicología Pareja'
            ? (
              <>
                {renderPatient()}
              </>
            )
            : (
              <>
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
                            className={classes.place}
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
                            type="number"
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
              </>
            )}
        </Container>
      </main>
    </div>
  );
}
export default RegisterPatient;
