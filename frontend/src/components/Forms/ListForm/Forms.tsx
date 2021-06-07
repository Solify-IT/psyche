import React from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
}
  from '@material-ui/core';

import Form from 'src/interfaces/form';
import { Link } from 'react-router-dom';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

type FormProps = {
  forms: Form[];
  recordId: number;
};
const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 6),
  },
  paper: {
    padding: '30px',
  },
  formRow: {
    margin: theme.spacing(5, 0),
  },
  title: {
    marginBottom: '50px',
  },
}));
function Forms(props: FormProps) {
  const { forms, recordId } = props;
  const classes = useStyles();

  if (forms.length === 0) {
    return (
      <MainContent>
        <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} square>
          <Grid container justify="center">
            <Typography variant="h5" className={classes.title}>
              No se encontraron formularios disponibles para este expediente.
            </Typography>

          </Grid>
          <Grid container justify="center">
            <Button variant="contained" color="primary" component={Link} to="/new-form">
              Registrar un nuevo formulario
            </Button>
          </Grid>

        </Grid>
      </MainContent>

    );
  }
  return (
    <MainContent>
      <ContentTitle text="Formularios" />
      <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} square>
        <Grid container justify="center">
          <Typography variant="h5" className={classes.title}>
            Formularios disponibles para:
            {' '}
            {forms[0].type}
          </Typography>
        </Grid>
        {forms.map((form) => (
          <Container key={form.id}>
            <Divider />
            <Grid container className={classes.formRow}>
              <Grid item xs={6}>
                {form.name}
              </Grid>
              <Grid item xs={3}>
                Creado en:
                {' '}
                {form.startDate}
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/expediente/${recordId}/encuestas/${form.id}`}
                >
                  Elegir
                </Button>
              </Grid>
            </Grid>
            <Divider />

          </Container>

        ))}
      </Grid>
    </MainContent>
  );
}

export default Forms;
