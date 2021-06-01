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
import Form from 'src/interfaces/form';
import FieldOption from 'src/interfaces/fieldOptions';
import { registerPatientForm } from 'src/api/forms';
import LoadingSpinner from 'src/components/loadingSpinner';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  group: {
    margin: theme.spacing(3, 0, 3),
    textAlign: 'left',
  },
  submit: {
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(0, 1, 0),
  },
  paper: {
    marginTop: '20px',
    padding: '30px',
  },
}));

type GenerateFormProps = {
  data: Form;
  id: number;
};

function GenerateForm(props: GenerateFormProps) {
  const { id, data } = props;
  const classes = useStyles();
  const history = useHistory();

  const [fields, setFields] = useState(data.fields.sort((a, b) => {
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
  }));
  useEffect(() => {
    setFields(data.fields);
  }, []);
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
      name: data.name,
      type: data.type,
      fields,
    };
    setLoading(true);
    try {
      await registerPatientForm(id, patientForm);
      toast.success('Se han llenado los datos de la encuesta exitosamente.');
      history.replace(`/expediente/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al intentar registrar la encuesta');
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
      case 'signature':
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

      <ContentTitle text="Llenar Formato del Paciente" />
      <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Nombre del Formato:
            {' '}
            {data.name}
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

export default GenerateForm;
