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
    height: '130px',
    width: 'auto',
    marginRight: '30px',
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
  console.log(info);

  const sleep = (milliseconds: any) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  async function timeSensativeAction() {
    await sleep(2000);
    window.print();
    history.replace(`/patient-form/${formId}`);
  }
  const aux = formInformation.recordId;
  console.log(aux);
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

        <Grid item xs={12} justify="center" alignItems="center">
          <Paper variant="outlined" className={classes.patientSection}>
            <Grid container>
              <Grid item>
                <img src="/images/loginImage.png" alt="Logo" className={classes.image} />
              </Grid>
              <Grid item>
                {info.patients.map((patientPrint) => (
                  <Typography variant="h4" align="left" className={classes.subtitles1}>
                    {patientPrint.name}
                  </Typography>
                ))}
                <Typography variant="h4" align="left" className={classes.subtitles1}>
                  {formInformation.recordId}
                </Typography>
                <Typography variant="h4" align="left" className={classes.subtitles1}>
                  Patronato Psicológico Queretano I.A.P
                </Typography>
                <Typography align="left" className={classes.subtitles}>
                  { formInformation.name}
                  {' '}
                </Typography>
                <Typography align="left" className={classes.subtitles}>
                  Folio: PPQ-
                  {' '}
                  {formInformation.recordId}
                </Typography>
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
