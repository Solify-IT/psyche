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
import Field from 'src/interfaces/field';
import { getFormField } from 'src/api/forms';
import { useHistory, useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import './print.css';
import { getPatientRecord } from 'src/api/patient';
import PatientForm from 'src/interfaces/patientForm';
import Patient from 'src/interfaces';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  group: {
    margin: theme.spacing(3, 0, 3),
    textAlign: 'left',
    fontSize: '78px',
  },
  image: {
    height: '250px',
    width: 'auto',
    marginRight: '80px',
    marginLeft: '20px',
    marginTop: '22px',
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
    fontSize: '10px',
    marginTop: '0px',
  },
  resize2: {
    fontSize: '15px',
  },
  subtitles1: {
    marginTop: '0px',
    padding: '10px',
    paddingBottom: '0px',
    color: '#000000',
    fontSize: '20px',
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
  subtitlesLabel: {
    marginTop: '0px',
    padding: '10px',
    paddingBottom: '0px',
    color: '#000000',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  icon: {
    paddingLeft: '5px',
  },
  text: {
    align: 'center',
  },
  patientSection: {
    align: 'center',
    margin: theme.spacing(4, 2),
    flexDirection: 'column',
    borderColor: '#C94B72',
    borderRadius: 20,
    padding: theme.spacing(2, 6),
    marginTop: '2px',
    marginBottom: '2px',
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
  },
  firma: {
    fontSize: '13px',
    textAlign: 'center',
    font: 'inherit',
  },
  gridFirma: {
    bottom: '100px',
    width: '100%',
  },

  headerSection: {
    align: 'center',
    flexDirection: 'column',
    borderColor: '#C94B72',
    margin: '30px',
    padding: '15px',
  },
}));

function PrintForm() {
  const { formId } : any = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [fields, setFields] = useState<Field[]>([]);
  const [formInformation, setFormInformation] = useState({
    id: 0,
    name: '',
    recordId: 0,
    type: '',
    createdData: '',
  });
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
    // //window.print();
    // history.replace(`/patient-form/${formId}`);
  }
  const aux = formInformation.recordId;
  useEffect(() => {
    getPatientRecord(aux)
      .then((response:any) => {
        setInfo(response.data);
        console.log(response.data);
      })
      .catch((error:any) => console.log(error));

    getFormField(formId)
      .then((response:any) => {
        setFields(Object.values(response.data.fields.sort(
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
        )));
        timeSensativeAction();
        setFormInformation(response.data);
      })
      .catch((error:any) => console.log(error));
  }, [formId, aux]);

  function createComponent(field:any) {
    switch (field.type) {
      case 'Campo de texto':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
          return (
            <Grid item xs={4}>
              <TextField
                key={field.id.toString()}
                style={{ width: '95%', margin: '5px' }}
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
      case 'text':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      case 'Campo de número':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '98%', margin: '5px'}}
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
      }
      case 'number':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
      case 'Selección de fecha':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
      case 'datepicker':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
      case 'Selección de opciones':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
      case 'select':
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
                key={field.id.toString()}
                style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
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
      case 'Selección múltiple': {
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
            <FormControl
              component="fieldset"
              key={field.id.toString()}
              style={{ width: '98%', margin: '5px' }}
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
          );
        } else {
        return (
          <Grid item xs={4}>
            <FormControl
              component="fieldset"
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
      case 'checkbox': {
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
            <FormControl
              component="fieldset"
              key={field.id.toString()}
              style={{ width: '98%', margin: '5px' }}
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
          );
        } else {
        return (
          <Grid item xs={4}>
            <FormControl
              component="fieldset"
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
      }
      default:
        if(field.value.length > 30 || field.label.length > 25){
          return (
            <Grid item xs={12}>
              <TextField
              key={field.id.toString()}
              style={{ width: '98%', margin: '5px' }}
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
        } else {
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              style={{ width: '95%', margin: '5px' }}
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
  }
  return (
    <div className={classes.heroContent}>
      <main>

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
                <div style={{ display: 'flex' }}>
                  <Typography align="left" className={classes.subtitlesLabel} noWrap>
                    Formato:
                  </Typography>
                  <Typography align="left" className={classes.subtitles} style={{ marginLeft: '5.2rem' }} noWrap>
                    { formInformation.name}
                  </Typography>
                </div>
                <div style={{ display: 'flex' }}>
                  <Typography align="left" className={classes.subtitlesLabel} noWrap>
                    Número de Expediente:
                  </Typography>
                  <Typography align="left" className={classes.subtitles} noWrap>
                   PPQ-{ formInformation.recordId}
                  </Typography>
                </div>
                {info.patients.map((patientPrint) => (
                  <div>
                    <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Nombre:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '5.3rem' }} noWrap>
                            {patientPrint.name}
                            {' '}
                            {patientPrint.lastName}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Género:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '5.5rem' }} noWrap>
                            {patientPrint.gender}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Tipo de paciente:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '2.1rem' }} noWrap>
                            {patientPrint.type}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Lugar de nacimiento:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '0.7rem' }} noWrap>
                            {patientPrint.birthPlace}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Fecha de inicio:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '2.7rem' }} noWrap>
                            {patientPrint.startDate}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Teléfono:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '5.1rem' }} noWrap>
                            {patientPrint.telephone}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Dirección:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '4.7rem' }} noWrap>
                            {patientPrint.address}
                          </Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <Typography align="left" className={classes.subtitlesLabel} noWrap>
                            Código postal:
                          </Typography>
                          <Typography align="left" className={classes.subtitles} style={{ marginLeft: '3.1rem' }} noWrap>
                            {patientPrint.postalCode}
                          </Typography>
                        </div>
                  </div>
               ))}
              </Grid>
            </Grid>
          </Paper>
          <Typography align="center" className={classes.aviso} />
        </Grid>

        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid container justify="center" alignItems="center">
                {fields.filter((field) => field.type !== 'Firma' && field.type !== 'signature').map(createComponent)}
              </Grid>
              <Grid container justify="center" alignItems="center">
                {fields.filter((field) => field.type === 'Firma' || field.type === 'signature').map(createComponent)}
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
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
}

export default PrintForm;
