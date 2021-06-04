import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
}
  from '@material-ui/core';
import FieldOption from 'src/interfaces/fieldOptions';
import Field from 'src/interfaces/field';
import { updatePatientForm, getFormField } from 'src/api/forms';
import LoadingSpinner from 'src/components/loadingSpinner';
import { useHistory, useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  group: {
    margin: theme.spacing(3, 0, 3),
    textAlign: 'left',
  },
  paper: {
    marginTop: '20px',
    padding: '30px',
  },
  submit: {
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(0, 1, 0),
  },
}));

function UpdatePatientForm() {
  const { formId } : any = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [formInformation, setFormInformation] = useState({
    id: 0,
    name: '',
    recordId: 0,
    type: '',
    createdData: '',
  });
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    getFormField(formId)
      .then((response:any) => {
        setFields(Object.values(response.data.fields.sort(
          (a: PatientFormField, b: PatientFormField) => {
            if (a.id && b.id) {
              if (a.id < b.id!) {
                return -1;
              }
              if (a.id > b.id) {
                return 1;
              }
              return 0;
            }
            console.error('Form ids not obtained. Defaulting to standard order');
            return 0;
          },
        )));
        setFormInformation(response.data);
      })
      .catch((error:any) => console.log(error));
  }, [formId]);

  const [loading, setLoading] = useState<boolean>(false);

  function getIndex(value:any, arr:any, prop:any) : number {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; // to handle the case where the value doesn't exist
  }

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFields((prevValues) => {
      const aux = [...prevValues];
      const index = getIndex(Number(event.target.id), fields, 'id');
      aux[index].value = event.target.value;
      return aux;
    });
  };
  const handleSelect = (event: React.ChangeEvent<any>) => {
    setFields((prevValues) => {
      const aux = [...prevValues];
      const index = getIndex(Number(event.target.name), fields, 'id');
      aux[index].value = event.target.value;
      return aux;
    });
  };
  const handleCheck = (event: React.ChangeEvent<any>) => {
    const itemId = event.currentTarget.dataset.id;
    const groupId = event.currentTarget.dataset.group;
    setFields((prevValues) => {
      const aux = [...prevValues];
      const index = getIndex(Number(groupId), fields, 'id');
      aux[index].options[itemId].checked = event.target.checked;
      return aux;
    });
  };

  const createSelect = (option:any) => (
    <MenuItem
      id={option.id.toString()}
      key={option.id.toString()}
      value={option.label}
    >
      {option.label}

    </MenuItem>
  );

  const handleSubmit = async () => {
    const patientForm = {
      id: formInformation.id,
      name: formInformation.name,
      recordId: formInformation.recordId,
      type: formInformation.type,
      createdData: formInformation.createdData,
      fields,
    };
    setLoading(true);
    try {
      await updatePatientForm(formId, patientForm);
      Swal.fire(
        '¡Encuesta registrada!',
        'Se ha guardado la encuesta del paciente',
        'success',
      );
      history.replace(`/expediente/${formInformation.recordId}`);
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

  function createComponent(field:any) {
    switch (field.type) {
      case 'text':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={field.id.toString().toString()}
              label={field.label}
              name={field.label.replace(/\s/g, '')}
              value={field.value}
              onChange={handleChange}
            />
          </Grid>
        );
      case 'number':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              id={field.id.toString()}
              label={field.label}
              name={field.label.replace(/\s/g, '')}
              value={field.value}
              onChange={handleChange}
            />
          </Grid>
        );
      case 'datepicker':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="date"
              id={field.id.toString()}
              label={field.label}
              name={field.label.replace(/\s/g, '')}
              value={field.value}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
        );
      case 'select':
        return (
          <Grid item xs={4}>
            <div className={classes.group}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                required
                fullWidth
                label={field.label}
                key={field.id.toString()}
                name={field.id.toString()}
                value={field.value}
                onChange={handleSelect}
              >
                {field.options.map(createSelect)}
              </Select>
            </div>
          </Grid>
        );
      case 'checkbox': {
        return (
          <Grid item xs={4}>
            <FormControl component="fieldset" className={classes.formControl} key={field.id.toString()}>
              <FormLabel component="legend">{field.label}</FormLabel>
              <FormGroup>
                {field.options.map((option:FieldOption, index:any) => (
                  <FormControlLabel
                    control={(
                      <Checkbox
                        key={option.id?.toString()}
                        checked={option.checked}
                        name={option.label}
                        data-id={index}
                        data-group={field.id.toString()}
                        onClick={handleCheck}
                      />
                )}
                    label={option.label}
                    key={option.id}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        ); }
      default:
        return (
          <TextField
            key={field.id.toString()}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={field.id.toString()}
            label={field.label}
            name={field.label.replace(/\s/g, '')}
            value={field.value}
          />
        );
    }
  }

  return (
    <MainContent>

      <ContentTitle text="Modificar Encuesta De Paciente" />
      <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Nombre del Formato:
            {' '}
            {formInformation.name}
          </Typography>
        </Grid>
        {fields.filter((field) => field.type !== 'signature').map(createComponent)}

        <Grid container alignItems="center" justify="center" direction="row">
          <Grid item>
            {!loading ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Registrar
              </Button>
            ) : <LoadingSpinner /> }
          </Grid>

        </Grid>
      </Grid>
    </MainContent>
  );
}

export default UpdatePatientForm;
