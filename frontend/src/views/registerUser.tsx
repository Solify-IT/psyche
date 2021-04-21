/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
}
  from '@material-ui/core';

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
}));
function RegisterUser() {
/* eslint-disable react/jsx-props-no-spreading */
  const classes = useStyles();
  /* const [newUser, setNewField] = useState({
    label: '',
    type: '',
    name: '',
  }); */
  /* const { label, type, name } = { ...newField };

  const [list, setList] = useState<NewField[]>([]);

  const handleNewField = (event: React.ChangeEvent<any>) => {
    setNewField({ ...newField, [event.target.name]: event.target.value });
  }; */

  return (
    <div className={classes.heroContent}>
      <Container>
        <Typography variant="h2" align="center">
          Registrar Usuario
        </Typography>

        <Grid container>
          <Grid item xs={12} component={Paper} className={classes.paper} elevation={6} square>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                // eslint-disable-next-line no-restricted-globals
                value={name}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Direccion"
                name="address"
                // eslint-disable-next-line no-restricted-globals
                value={name}
              />
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="zipCode"
                  label="Código Postal"
                  name="zipCode"
                // eslint-disable-next-line no-restricted-globals
                  value={name}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="telephone"
                  label="Telefono"
                  name="telephone"
                // eslint-disable-next-line no-restricted-globals
                  value={name}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>

  );
}
export default RegisterUser;
