import React, { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Button,
  FormHelperText,
  TextField,
}
  from '@material-ui/core';
import {
  todos,
} from 'src/interfaces/options';
import PatientArea from 'src/interfaces/patientArea';
import { createProfile } from 'src/api/user';
import { toast } from 'react-toastify';
import LoadingSpinner from 'src/components/loadingSpinner';
import { authenticationService, profileSet, setPatientAreas } from 'src/api/authenticationService';
import { useHistory } from 'react-router';
import FadeIn from 'react-fade-in';
import ContentTitle from 'src/components/contentTitle';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  paper: {
    marginTop: '20px',
    padding: '20px',
  },
  submit: {
    marginTop: '25px',
  },
  table: {
    padding: '10px',
  },
  checkboxRow: {
    margin: theme.spacing(2.5, 0),
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function RegisterProfile() {
  const classes = useStyles();
  const history = useHistory();

  const [patientAreas, setNewPatientAreas] = useState<PatientArea[]>(() => {
    const initialArray : PatientArea[] = [];
    todos.forEach((category) => {
      category.forEach((area) => {
        initialArray.push({ name: area.name, checked: false });
      });
    });
    return initialArray;
  });

  const [workSchedule, setWorkSchedule] = useState<string>('');

  useEffect(() => {
    if (!authenticationService.currentUserValue.user.firstTime) {
      history.replace('/');
      toast.warning('Ya ha registrado su perfil anteriormente.');
    }
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createProfile(patientAreas, workSchedule);
      setPatientAreas(patientAreas);
      profileSet();
      history.replace('/');
      toast.success('Se ha registrado su perfil de psicólogo exitosamente');
    } catch (error) {
      toast.error('Ocurrió un error al intentar registrar el perfil.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<any>) => {
    const newArray = [...patientAreas];
    newArray[event.target.id].checked = event.target.checked;
    setNewPatientAreas(newArray);
  };

  const handleChangeTextArea = (event: React.ChangeEvent<any>) => {
    setWorkSchedule(event.target.value);
  };

  const checkboxError = patientAreas.filter((area) => area.checked).length === 0;
  return (
    <FadeIn>
      <div className={classes.heroContent}>
        <Container>
          <ContentTitle text="Registrar areas de tratamiento" />
          <Container>
            <Grid
              container
              justify="center"
            >
              <Grid
                item
                xs={12}
                component={Paper}
                className={classes.paper}
                elevation={6}
                square
              >
                <Grid
                  container
                  alignContent="stretch"
                >
                  <FormControl required error={checkboxError} component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Areas</FormLabel>
                    <FormHelperText>Elige por lo menos una opción</FormHelperText>
                    <FormGroup>
                      { patientAreas.map((area, index) => (
                        <div className={classes.checkboxRow} key={area.name}>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={area.checked}
                                onChange={handleChangeCheckbox}
                                name={area.name}
                                id={index.toString()}
                              />
                  )}
                            label={area.name}
                          />
                        </div>

                      ))}

                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid container>
                  <FormControl component="fieldset" className={classes.formControl} fullWidth>
                    <FormLabel component="legend">Horarios</FormLabel>
                    <FormHelperText>Ingresa tus horarios</FormHelperText>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        inputProps={{ minLength: 5 }}
                        fullWidth
                        multiline
                        rows={4}
                        id="workSchedule"
                        label="Horario"
                        name="workSchedule"
                        onChange={handleChangeTextArea}
                        value={workSchedule}
                      />
                    </Grid>
                  </FormControl>
                </Grid>

                <Grid container spacing={3} justify="center">
                  <Grid item xs={6}>
                    { loading ? <LoadingSpinner /> : (
                      <Button
                        type="submit"
                        fullWidth
                        disabled={checkboxError}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                      >
                        Guardar
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </div>
    </FadeIn>

  );
}
export default RegisterProfile;
