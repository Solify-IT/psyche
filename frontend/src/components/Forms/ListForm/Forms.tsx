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
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import ContentTitle from 'src/components/contentTitle';

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
      <FadeIn>
        <main>
          <div className={classes.heroContent}>

            <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} square>
              <Grid container justify="center">
                <Typography variant="h5" className={classes.title}>
                  No se encontraron encuestas disponibles para este expediente.
                </Typography>

              </Grid>
              <Grid container justify="center">
                <Button variant="contained" color="primary" component={Link} to="/new-form">
                  Registrar una nueva encuesta
                </Button>
              </Grid>

            </Grid>
            {' '}
          </div>
        </main>
      </FadeIn>
    );
  }
  return (
    <FadeIn>
      <main>
        <div className={classes.heroContent}>
          <Container>
            <ContentTitle text="Encuestas" />
            <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} square>
              <Grid container justify="center">
                <Typography variant="h5" className={classes.title}>
                  Encuestas disponibles para:
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
          </Container>
        </div>
      </main>
    </FadeIn>
  );
}

export default Forms;
