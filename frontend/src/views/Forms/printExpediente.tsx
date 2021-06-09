import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
}
  from '@material-ui/core';
import FieldOption from 'src/interfaces/fieldOptions';
import { getFormId } from 'src/api/forms';
import { useHistory, useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import Patient from 'src/interfaces/patient';
// import './print.css';
import { getPatientRecord } from 'src/api/patient';
import PatientForm from 'src/interfaces/patientForm';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  '@media print': {
    headerSection: {
      breakAfter: 'always',
      pageBreakAfter: 'always',
    },
    patientSection: {
      breakBefore: 'always',
      pageBreakBerofe: 'always',
    },
    aviso: {
      breakAfter: 'always',
      pageBreakAfter: 'always',
    },
  },
  group: {
    margin: theme.spacing(3, 0, 3),
    textAlign: 'left',
    fontSize: '78px',
  },
  imageFront: {
    height: '700px',
    width: 'auto',
  },
  image: {
    height: '130px',
    width: 'auto',
    marginRight: '30px',
    alignItems: 'center',
  },
  submit: {
    textAlign: 'center',
  },
  subtitles: {
    marginTop: '0px',
    padding: '10px',
    paddingBottom: '0px',
    color: '#000000',
    fontSize: '12px',
  },
  checkboxLabel: {
    fontSize: '12px',
  },
  resize: {
    fontSize: '12px',
    marginTop: '7px',
  },
  resize2: {
    fontSize: '15px',
  },
  subtitles1: {
    marginTop: '0px',
    marginBottom: '7px',
    padding: '10px',
    paddingBottom: '0px',
    color: '#000000',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  subtitlesLabel: {
    marginTop: '0px',
    padding: '10px',
    paddingBottom: '0px',
    color: '#000000',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  texto: {
    fontSize: '10px',
  },
  formControl: {
    margin: theme.spacing(0, 1, 0),
    fontSize: '10px',
  },
  button: {
    marginTop: '2px',
    float: 'right',
    marginLeft: '15px',
    textTransform: 'none',
  },
  icon: {
    paddingLeft: '5px',
  },
  text: {
    align: 'center',
  },
  headerSection: {
    align: 'center',
    flexDirection: 'column',
    borderColor: '#C94B72',
    width: '20.2cm',
    height: '27.2cm',
    marginBottom: '3cm',
    marginTop: '0.5cm',
  },
  patientSection: {
    align: 'center',
    margin: theme.spacing(4, 2),
    flexDirection: 'column',
    borderColor: '#C94B72',
    borderRadius: 20,
    padding: theme.spacing(2, 6),
    marginTop: '30px',
    marginBottom: '7px',
  },
  divider: {
    marginTop: '100px',
    background: 'black',
  },
  aviso: {
    fontSize: '9px',
    marginTop: '40px',
    bottom: '20px',
    width: '100%',
    maringBottom: '5px',
  },
  firma: {
    fontSize: '13px',
    textAlign: 'center',
    font: 'inherit',
    marginBottom: '2px',
  },
  gridFirma: {
    bottom: '100px',
    width: '100%',
  },
}));

function PrintExpediente() {
  const { recordId } : any = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [fields, setFields] = useState<PatientFormField[]>([]);
  const [info, setInfo] = useState({
    id: 1,
    startDate: Date,
    active: true,
    forms: Array<PatientForm>(),
    patients: Array<Patient>(),
  });
  const sleep = (milliseconds: any) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  async function timeSensativeAction() {
    await sleep(2000);
    window.print();
    history.replace(`/expediente/${recordId}`);
  }

  useEffect(() => {
    getPatientRecord(recordId)
      .then((response:any) => {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch((error:any) => console.log(error));

    getFormId(recordId)
      .then((response:any) => {
        const preOrder : PatientFormField[] = Object.values(response.data.sort(
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
        ));
        setFields(preOrder);
        timeSensativeAction();
      })
      .catch((error:any) => console.log(error));
  }, [recordId]);

  function createComponent(field:any) {
    switch (field.type) {
      case 'text':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString().toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'Campo de texto':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString().toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'number':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'Campo de número':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'datepicker':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'Selección de fecha':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'select':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'Selección de opciones':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
      case 'signature':
        return (
          <Grid item xs={4} spacing={5} className={classes.gridFirma}>
            <div>
              <Divider variant="middle" className={classes.divider} />
              <Typography className={classes.firma}>
                {field.label}
              </Typography>
            </div>
          </Grid>
        );
      case 'Firma':
        return (
          <Grid item xs={4} spacing={5} className={classes.gridFirma}>
            <div>
              <Divider variant="middle" className={classes.divider} />
              <Typography className={classes.firma}>
                {field.label}
              </Typography>
            </div>
          </Grid>
        );
      case 'checkbox': {
        return (
          <Grid item xs={4}>
            <FormControl
              component="fieldset"
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
            >
              <FormLabel className={classes.resize}>{field.label}</FormLabel>
              <FormGroup>
                {field.options.map((option:FieldOption, index:any) => (
                  <FormControlLabel
                    style={{ fontSize: '20px' }}
                    control={(
                      <Checkbox
                        key={option.id?.toString()}
                        checked={option.checked}
                        name={option.label}
                        data-id={index}
                        data-group={field.id.toString()}
                      />
                  )}
                    label={option.label}
                    key={option.id}
                    classes={{
                      label: classes.checkboxLabel,
                    }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        ); }
      case 'Selección múltiple': {
        return (
          <Grid item xs={4}>
            <FormControl
              component="fieldset"
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
            >
              <FormLabel className={classes.resize}>{field.label}</FormLabel>
              <FormGroup>
                {field.options.map((option:FieldOption, index:any) => (
                  <FormControlLabel
                    style={{ fontSize: '20px' }}
                    control={(
                      <Checkbox
                        key={option.id?.toString()}
                        checked={option.checked}
                        name={option.label}
                        data-id={index}
                        data-group={field.id.toString()}
                      />
                  )}
                    label={option.label}
                    key={option.id}
                    classes={{
                      label: classes.checkboxLabel,
                    }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        ); }
      default:
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '90%', margin: '10px' }}
              id={field.id.toString().toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </Grid>
        );
    }
  }

  return (
    <div className={classes.heroContent}>
      <main>
        <div>
          <Container>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} justify="center" alignItems="center">
                {info.patients.map((patientPrint) => (
                  <Paper variant="outlined" className={classes.headerSection}>
                    <Grid container justify="center" alignItems="center">
                      <Grid justify="center" alignItems="center">
                        <img src="/images/loginImage.png" alt="Logo" className={classes.imageFront} />
                      </Grid>
                      <Grid justify="center" alignItems="center">
                        <Typography variant="h4" align="left" className={classes.subtitles1}>
                          Patronato Psicológico Queretano I.A.P
                        </Typography>
                        <Typography variant="h4" align="left" className={classes.subtitles1}>
                          Folio: PPQ-
                          {' '}
                          {patientPrint.recordId}
                        </Typography>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Nombre:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '4.6rem' }} noWrap>
                            {patientPrint.name}
                            {' '}
                            {patientPrint.lastName}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Género:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '4.8rem' }} noWrap>
                            {patientPrint.gender}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Tipo de paciente:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '1.4rem' }} noWrap>
                            {patientPrint.type}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Lugar de nacimiento:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} noWrap>
                            {patientPrint.birthPlace}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Fecha de inicio:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '2rem' }} noWrap>
                            {patientPrint.startDate}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Teléfono:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '4.4rem' }} noWrap>
                            {patientPrint.telephone}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Dirección:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '4.2rem' }} noWrap>
                            {patientPrint.address}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Código postal:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '2.6rem' }} noWrap>
                            {patientPrint.postalCode}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Typography align="center" className={classes.aviso} />
              </Grid>

              {fields.map((field) => (
                <div>
                  <Grid item xs={12} justify="center" alignItems="center">
                    <Paper variant="outlined" className={classes.patientSection}>
                      <Grid container>
                        <Grid item>
                          <img src="/images/loginImage.png" alt="Logo" className={classes.image} />
                        </Grid>
                        <Grid item>
                          <Typography variant="h4" align="left" className={classes.subtitles1}>
                            Patronato Psicológico Queretano I.A.P
                          </Typography>
                          <Typography align="left" className={classes.subtitles}>
                            { field.name}
                            {' '}
                          </Typography>
                          <Typography align="left" className={classes.subtitles}>
                            Folio: PPQ-
                            {' '}
                            {field.recordId}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    {/* {field.fields.map(createComponent)} */}
                    {field.fields.filter((a) => a.type !== 'signature' && a.type !== 'Firma').sort(
                      (a, b) => {
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
                    ).map(createComponent)}
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    {field.fields.filter((a) => a.type === 'signature' || a.type === 'Firma').map(createComponent)}
                  </Grid>
                  <Grid container justify="center" alignItems="center" {...{ class: 'page' }}>
                    <Grid item xs={12}>
                      <Typography align="center" className={classes.aviso}>
                        Sirva el presente AVISO DE PRIVACIDAD DE DATOS PERSONALES para
                        efectos de informar a usted, que de conformidad con lo
                        dispuesto en los artículos  15 y 16 de la Ley Federal de Protección
                        de Datos Personales en posesión de Particulares,
                        hacemos de su conocimiento que:
                        Patronato Psicológico Queretano  IAP, con domicilio fiscal
                        en Ignacio Allende 19 Sur,
                        Col Centro, municipio de Querétaro es responsable de
                        recabar sus datos personales,
                        del uso que se le dé a  los mismos y de su protección.
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />
                </div>
              ))}
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
}

export default PrintExpediente;
