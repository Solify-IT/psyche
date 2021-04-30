import React, { FC } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  IconButton,
  CardContent,
  Button,
} from '@material-ui/core';
import {
  Edit,
}
  from '@material-ui/icons';
import Patient from '../../interfaces/patient';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    textAlign: 'right',
  },
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  submit: {
    textAlign: 'center',
  },
}));

interface PatienstProps {
  previousStep: any,
  prevPreviousStep: any,
  patientOne: Patient,
  patientTwo: Patient,
  submitPatients: any,
}

const ViewCouple: FC<PatienstProps> = (props): JSX.Element => {
  const {
    previousStep, prevPreviousStep, patientOne, patientTwo, submitPatients,
  } = { ...props };
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.heroContent}>
      <Grid item xs={12} sm={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Información del Paciente Uno
            </Typography>
            <Typography variant="h5" component="h2">
              {patientOne.name}
              {' '}
              {patientOne.lastName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Género:
              {' '}
              {patientOne.gender}
            </Typography>
            <Typography variant="body2" component="p">
              <strong> Lugar de Nacimiento: </strong>
              {' '}
              {patientOne.birthPlace}
              <br />
              <strong> Fecha de Nacimiento: </strong>
              {' '}
              {patientOne.birthDate}
              <br />
              <strong> Domicilio: </strong>
              {' '}
              {patientOne.address}
              {' '}
              <br />
              <strong> Codigo Postal: </strong>
              {' '}
              {patientOne.postalCode}
              <br />
              <strong> Teléfono:</strong>
              {' '}
              {patientOne.telephone}
            </Typography>
            <div className={classes.icon}>
              <IconButton title="Editar" onClick={prevPreviousStep}>
                <Edit fontSize="large" style={{ color: '#C94B72' }} />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Información del Paciente Dos
            </Typography>
            <Typography variant="h5" component="h2">
              {patientTwo.name}
              {' '}
              {patientTwo.lastName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Género:
              {' '}
              {patientTwo.gender}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Lugar de Nacimiento:</strong>
              {' '}
              {patientTwo.birthPlace}
              <br />
              <strong>Fecha de Nacimiento:</strong>
              {' '}
              {patientTwo.birthDate}
              <br />
              <strong>Domicilio:</strong>
              {' '}
              {patientTwo.address}
              {' '}
              <br />
              <strong>Codigo Postal:</strong>
              {' '}
              {patientTwo.postalCode}
              <br />
              <strong>Teléfono:</strong>
              {' '}
              {patientTwo.telephone}
            </Typography>
            <div className={classes.icon}>
              <IconButton title="Editar" onClick={previousStep}>
                <Edit fontSize="large" style={{ color: '#C94B72' }} />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.submit}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={submitPatients}
        >
          Registrar Pacientes
        </Button>
      </Grid>
    </Grid>
  );
};

export default ViewCouple;
