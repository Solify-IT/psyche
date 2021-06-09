/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import Moment from 'moment';
import Record from 'src/interfaces/record';
import PatientForm from 'src/interfaces/patientForm';
import groupBy from 'src/utils/groupBy';
import Patient from 'src/interfaces';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import createRecordId from 'src/utils/createRecordId';
import FadeIn from 'react-fade-in';
import PrintIcon from '@material-ui/icons/Print';
import { archiveRecord } from '../api/patient';
import ContentTitle from './contentTitle';
import MainContent from './mainContent';
import CornerFab from './cornerFab';

const useStyles = makeStyles((theme) => ({
  patientSection: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#C94B72',
    borderRadius: 20,
    padding: theme.spacing(2, 6),
    marginTop: '20px',
  },
  patientSectionTitle: {
    marginBottom: 20,
  },
  icon: {
    paddingLeft: '5px',
  },
  patientSectionRow: {
    margin: theme.spacing(1, 0),
  },
  patientFileRow: {
    margin: theme.spacing(2, 0),
  },
  printB: {
    backgroundColor: '#A3529A',
    '&:hover': {
      backgroundColor: '#803b76',
    },
  },
  title: {
    color: '#C94B72',
    textAlign: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    height: 80,
    width: 80,
  },
  canalize: {
    textAlign: 'right',
    paddingRight: '35px',
  },
}));

type RecordInfoProps = {
  record: Record
};

type PatientGeneralInfoProps = {
  patient: Patient;
};

type RecordInfoSlotProps = {
  label: string,
  value: string,
};

type FormSectionProps = {
  title: string,
  forms: PatientForm[],
};

function RecordInfoSlot(infoProps: RecordInfoSlotProps) {
  const { label, value } = infoProps;
  return (
    <Grid item xs={12} md={4}>
      <Typography variant="body2">
        <strong>
          { label}
          :
          {' '}
        </strong>
        { value}
      </Typography>
    </Grid>
  );
}

function FormSection(props: FormSectionProps) {
  const history = useHistory();
  const classes = useStyles();
  const { forms, title } = props;

  function updateRecord(event: React.ChangeEvent<any>) {
    const { id } = event.currentTarget.dataset;
    history.push(`/update-patient-form/${id}`);
  }

  function consultForm(event: React.ChangeEvent<any>) {
    const { id } = event.currentTarget.dataset;
    // eslint-disable-next-line no-restricted-globals
    history.push(`/patient-form/${id}`);
  }

  return (
    <Paper key={title} variant="outlined" className={classes.patientSection}>
      <Grid container spacing={2} justify="space-between">
        <Grid item>
          <Typography component="h2" variant="h5" className={classes.patientSectionTitle}>
            <strong>
              { title }
            </strong>
          </Typography>
        </Grid>
      </Grid>
      { forms.map((form) => (
        <Grid justify="space-between" key={form.id} container spacing={4} className={classes.patientFileRow}>
          <Grid item xs={6} md={4}>
            <Typography component="h3" variant="h5">
              {form.name}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component="h4" variant="h5">
              Fecha:
              {' '}
              { Moment(form.createdDate).format('DD-MM-YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              data-id={form.id.toString()}
              onClick={consultForm}
              fullWidth
            >
              Consultar
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              color="secondary"
              data-id={form.id.toString()}
              fullWidth
              onClick={updateRecord}
            >
              Modificar
            </Button>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
}

function RecordInfo(props: RecordInfoProps) {
  const classes = useStyles();
  const history = useHistory();
  const { record } = props;
  const formsGrouped = groupBy(record.forms, (form) => form.name);
  const [loading, setLoading] = useState<boolean>(false);

  function updateCanalization(event: React.ChangeEvent<any>) {
    const { recordid } = event.currentTarget.dataset;
    history.push(`/update-patient-canalization/${recordid}`);
  }

  function printRecord(event: React.ChangeEvent<any>) {
    const { recordid } = event.currentTarget.dataset;
    history.push(`/record-print/${recordid}`);
  }

  const handleArchiveRecord = async (id: number) => {
    setLoading(true);
    try {
      await archiveRecord(id);
      console.log('ended');
      Swal.fire(
        'Expediente archivado!',
        'El expediente ha sido archivado y ya no estará disponible para su modificación.',
        'success',
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error interno!',
      });
      console.log(error);
    } finally {
      setLoading(false);
      history.replace('/');
    }
  };

  function confirmationArchive(event: React.ChangeEvent<any>) {
    const { recordid } = event.currentTarget.dataset;
    console.log(recordid);
    Swal.fire({
      title: '¿Estás seguro de archivar el expediente?',
      text: 'El expediente quedará inactivo y no podrá ser modificado a partir de la confirmación',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6EA84F',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Ok fue confirmado');
        handleArchiveRecord(recordid);
      }
    });
  }

  function PatientGeneralInfo(patientProps: PatientGeneralInfoProps) {
    const { patient } = patientProps;
    return (
      <Paper variant="outlined" className={classes.patientSection}>
        <Typography component="h3" variant="h5" className={classes.patientSectionTitle}>
          <strong>
            {`Paciente #${patient.id}`}
          </strong>
        </Typography>
        <Grid container spacing={2} className={classes.patientSectionRow}>
          <RecordInfoSlot label="Nombre" value={patient.name} />
          <RecordInfoSlot label="Apellidos" value={patient.lastName} />
          <RecordInfoSlot label="Genero" value={patient.gender} />
        </Grid>
        <Grid container spacing={2} className={classes.patientSectionRow}>
          <RecordInfoSlot label="Tipo de paciente" value={patient.type} />
          <RecordInfoSlot label="Lugar de nacimiento" value={patient.birthPlace} />
          <RecordInfoSlot label="Fecha de inicio" value={Moment(patient.startDate).format('DD-MM-YYYY')} />
        </Grid>
        <Grid container spacing={2} className={classes.patientSectionRow}>
          <RecordInfoSlot label="Telefono" value={patient.telephone} />
          <RecordInfoSlot label="Direccion" value={patient.address} />
          <RecordInfoSlot label="Codigo Postal" value={patient.postalCode.toString()} />
        </Grid>
      </Paper>
    );
  }

  return (
    <div>
      <MainContent>
        <Grid item md={12}>
          <ContentTitle text={`Expediente ${createRecordId(record.id)} `} />
          <Grid item xs={12}>
            <div className={classes.canalize}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                data-recordid={record.id}
                onClick={confirmationArchive}
              >
                Archivar
              </Button>
              {'  '}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                data-recordid={record.id}
                onClick={updateCanalization}
              >
                Modificar Canalización
              </Button>
              {'  '}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                data-recordid={record.id}
                onClick={printRecord}
                className={classes.printB}
              >
                Imprimir
                <PrintIcon className={classes.icon} />
              </Button>
            </div>
          </Grid>
          { record.patients.map((patient) => (
            <PatientGeneralInfo patient={patient} key={patient.id} />
          ))}
          {formsGrouped ? Object.keys(formsGrouped).map((key) => (
            <FormSection key={key} title={key} forms={formsGrouped[key]} />
          )) : false}
        </Grid>
      </MainContent>
      <CornerFab extended text="Agregar Formulario" link={`/expediente/${record.id}/encuestas`} />
    </div>
  );
}
export default RecordInfo;
