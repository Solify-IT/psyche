import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
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
import PrintIcon from '@material-ui/icons/Print';
import { getFormField } from 'src/api/forms';
import { useHistory, useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import './print.css';

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
  },
  firma: {
    fontSize: '13px',
    textAlign: 'center',
    font: 'inherit',
  },
}));

function PrintForm() {
  const { formId } : any = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [formInformation, setFormInformation] = useState({
    id: 0,
    name: '',
    recordId: 0,
    type: '',
    createdData: '',
  });
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
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
        setFormInformation(response.data);
      })
      .catch((error:any) => console.log(error));
  }, [formId]);

  function printDiv() {
    window.print();
    history.replace(`/patient-form/${formId}`);
  }

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
      case 'signature':
        return (
          <Grid item xs={4} spacing={5}>
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
            <FormControl component="fieldset" key={field.id.toString()}>
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
        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={printDiv}
                >
                  Imprimir
                  <PrintIcon className={classes.icon} />
                </Button>
              </Grid>
              <Grid container justify="center" alignItems="center">
                {fields.filter((field) => field.type !== 'signature').map(createComponent)}
              </Grid>
              <Grid container justify="center" alignItems="center">
                {fields.filter((field) => field.type === 'signature').map(createComponent)}
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
