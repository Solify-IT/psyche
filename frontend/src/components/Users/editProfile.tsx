import React, { useState } from 'react';
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
import PatientArea from 'src/interfaces/patientArea';
import { modifyProfile } from 'src/api/user';
import { toast } from 'react-toastify';
import LoadingSpinner from 'src/components/loadingSpinner';
import { setPatientAreas } from 'src/api/authenticationService';
import { useHistory } from 'react-router';
import ContentTitle from '../contentTitle';
import MainContent from '../mainContent';

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

type ProfileSetProps = {
  areas : PatientArea[];
  workSchedule : string;
};

function EditProfile(props: ProfileSetProps) {
  const classes = useStyles();
  const history = useHistory();
  const { areas, workSchedule } = props;

  const [newWorkSchedule, setNewWorkSchedule] = useState<string>(workSchedule);

  const [patientAreas, setNewPatientAreas] = useState<PatientArea[]>(areas.sort((a, b) => {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  }));

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await modifyProfile(patientAreas, newWorkSchedule);
      setPatientAreas(patientAreas);
      toast.success('Se ha modificado su perfil de usuario exitosamente');
      history.push('/');
    } catch (error) {
      toast.error('Ocurrió un error al intentar modificar el perfil.');
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
    setNewWorkSchedule(event.target.value);
  };

  const checkboxError = patientAreas.filter((area) => area.checked).length === 0;
  return (
    <MainContent>

      <ContentTitle text="Modificar perfil de psicólogo" />
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
                    <div className={classes.checkboxRow} key={area.id}>
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
                      value={newWorkSchedule}
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
        </Grid>
      </Container>
    </MainContent>

  );
}
export default EditProfile;
