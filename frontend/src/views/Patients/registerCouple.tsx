import React, { FC } from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from '@material-ui/core';
import MainContent from 'src/components/mainContent';
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
  type: {
    textAlign: 'right',
  },
  next: {
    marginLeft: '10px',
  },
}));

interface PatientProps {
  previousStep: any,
  nextStep: any,
  step: any,
  patient: Patient,
  handlePatient: any,
}

const RegisterCouple: FC<PatientProps> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    previousStep, nextStep, step, patient, handlePatient,
  } = { ...props };
  let flag = false;
  if (step === 1) {
    flag = true;
  }
  return (
    <MainContent>

      <Grid container justify="center">
        <Grid
          item
          xs={10}
          component={Paper}
          className={classes.paper}
          elevation={6}
          justify="center"
        >
          <Grid container justify="flex-end" alignItems="flex-end">
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.type} color="secondary">
                Paciente -
                {' '}
                {step}
              </Typography>
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
                value={patient.name}
                onChange={handlePatient}
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
                value={patient.lastName}
                onChange={handlePatient}
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
                value={patient.birthDate}
                onChange={handlePatient}
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
                value={patient.birthPlace}
                onChange={handlePatient}
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
                  value={patient.gender}
                  onChange={handlePatient}
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
                value={patient.address}
                onChange={handlePatient}
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
                value={patient.postalCode}
                onChange={handlePatient}
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
                value={patient.telephone}
                onChange={handlePatient}
              />
            </Grid>
            <Grid item xs={12} className={classes.submit}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={flag}
                onClick={previousStep}
              >
                Anterior
              </Button>
              <Button
                className={classes.next}
                type="submit"
                variant="contained"
                color="primary"
                onClick={nextStep}
              >
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default RegisterCouple;
