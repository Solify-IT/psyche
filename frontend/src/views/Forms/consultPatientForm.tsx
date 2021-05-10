import React, { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Card,
  Button,
}
  from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import dataForm from '../dataForm';

function ConsultPatientForm() {
  const [field, setField] = useState(dataForm);
  useEffect(() => {
    // Aqui vamos a mandar a llamar el endpoint de get
    if (dataForm !== []) {
      setField(dataForm);
    }
  }, []);
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    subtitles: {
      marginTop: '0px',
      padding: '10px',
      paddingBottom: '0px',
      color: '#000000',
    },
    label: {
      padding: theme.spacing(2),
    },
    description: {
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    image: {
      height: '130px',
      width: 'auto',
    },
    option: {
      textDecoration: 'none',
    },
    textPadding: {
      color: '#000000',
      paddingBottom: '26px',
      paddingTop: '26px',
    },
    card: {
      marginTop: '60px',
    },
    button: {
      marginTop: '30px',
      float: 'right',
      marginLeft: '15px',
      textTransform: 'none',
    },
    icon: {
      paddingLeft: '5px',
    },
  }));

  const classes = useStyles();

  return (
    field.map((fieldPatiente) => (
      <main>
        <div className={classes.heroContent}>
          <Container>
            <Grid>
              <Grid item xs={12}>
                <Typography variant="h2" align="center" className={classes.subtitles}>

                  { fieldPatiente.name}
                  {' '}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Imprimir
                  <PrintIcon className={classes.icon} />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Editar
                  {'     '}
                  <EditIcon className={classes.icon} />
                </Button>
              </Grid>
              <br />
              <Grid item xs={12} lg={12}>
                <Card className={classes.card}>
                  <p className={classes.label}>
                    Folio: PPQ-AP-001
                  </p>
                  <p className={classes.label}>
                    Fecha de registro:
                    {' '}
                    { fieldPatiente.date}
                  </p>
                  <p className={classes.label}>
                    Tipo de paciente:
                    {' '}
                    { fieldPatiente.type}
                    {' '}
                  </p>
                  { fieldPatiente.fields.map((fields) => (
                    <p className={classes.label}>
                      { fields.label}
                      {': '}
                      { fields.value}
                    </p>

                  )) }
                </Card>
                <p>
                  {' '}
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    ))
  );
}

export default ConsultPatientForm;
