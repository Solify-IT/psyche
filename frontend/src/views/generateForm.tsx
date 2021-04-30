import React, { useState, useEffect } from 'react';
import {
  Container,
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
}
  from '@material-ui/core';
import data from './data';

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
}));

function GenerateForm() {
  const classes = useStyles();
  const [fields, setFields] = useState(data.fields);
  useEffect(() => {
    setFields(data.fields);
  }, []);

  function getIndex(value:any, arr:any, prop:any) {
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
      const index = getIndex(event.target.id, fields, 'key');
      aux[index].value = event.target.value;
      return aux;
    });
  };
  const handleSelect = (event: React.ChangeEvent<any>) => {
    setFields((prevValues) => {
      const aux = [...prevValues];
      const index = getIndex(event.target.name, fields, 'key');
      aux[index].value = event.target.value;
      return aux;
    });
  };
  const handleCheck = (event: React.ChangeEvent<any>) => {
    const itemId = event.currentTarget.dataset.id;
    const groupId = event.currentTarget.dataset.group;
    setFields((prevValues) => {
      const aux = [...prevValues];
      const index = getIndex(groupId, fields, 'key');
      aux[index].options[itemId].checked = event.target.checked;
      return aux;
    });
  };

  const createSelect = (option:any) => (
    <MenuItem key={option.key} value={option.label}>{option.label}</MenuItem>
  );

  const handleSubmit = () => {
    const patientForm = {
      name: data.name,
      type: data.type,
      fields,
    };
    console.log(patientForm);
  };

  function createComponent(field:any) {
    switch (field.type) {
      case 'text':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.key}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={field.key}
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
              key={field.key}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              id={field.key}
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
              key={field.key}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="date"
              id={field.key}
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
                key={field.key}
                name={field.key}
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
            <FormControl component="fieldset" className={classes.formControl} key={field.key}>
              <FormLabel component="legend">{field.label}</FormLabel>
              <FormGroup>
                {/* {field.options.map(createCheckbox)} */}
                {field.options.map((option:any, index:any) => (
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={option.checked}
                        name={option.label}
                        data-id={index}
                        data-group={field.key}
                        onClick={handleCheck}
                      />
                )}
                    label={option.label}
                    key={option.key}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        ); }
      default:
        return (
          <TextField
            key={field.key}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={field.key}
            label={field.label}
            name={field.label.replace(/\s/g, '')}
            value={field.value}
          />
        );
    }
  }

  return (
    <main>
      <Typography variant="h2" align="center">
        Llenar Formato del Paciente
      </Typography>
      <div className={classes.heroContent}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                Nombre del Formato:
                {' '}
                {data.name}
              </Typography>
            </Grid>
            {fields.map(createComponent)}

            <Grid container alignItems="center" justify="center" direction="row">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Modificar
                </Button>
              </Grid>

            </Grid>

          </Grid>
        </Container>
      </div>
    </main>
  );
}

export default GenerateForm;
