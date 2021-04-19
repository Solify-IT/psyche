import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
}
  from '@material-ui/core';
import data from './data';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  submit: {

  },
}));

function GenerateForm() {
  const classes = useStyles();
  const [fields, setFields] = useState(data);

  useEffect(() => {
    // Aqui vamos a mandar a llamar el endpoint de get
    if (data !== []) {
      setFields(data);
    }
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
      const index = getIndex(event.target.id, fields, 'id');
      aux[index].value = event.target.value;
      return aux;
    });
  };

  function createComponent(field:any) {
    switch (field.type) {
      case 'Text':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={field.id}
              label={field.label}
              name={field.name}
              value={field.value}
              onChange={handleChange}
            />
          </Grid>
        );
      case 'Number':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              id={field.id}
              label={field.label}
              name={field.name}
              value={parseInt(field.value, 10)}
              onChange={handleChange}
            />
          </Grid>
        );
      default:
        return (
          <TextField
            key={field.id}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id={field.id}
            label={field.label}
            name={field.name}
            value={field.value}
          />
        );
    }
  }

  return (
    <main>
      <div className={classes.heroContent}>
        <Typography variant="h2" align="center">
          Editar Form
        </Typography>
        <Container>
          <Grid container spacing={3}>
            {fields.map(createComponent)}

            <Grid container alignItems="center" justify="center" direction="row">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
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
