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
  },
  submit: {
    textAlign: 'center',
  },
  subtitles: {
    marginTop: '0px',
    padding: '10px',
    paddingBottom: '0px',
    color: '#000000',
  },
  formControl: {
    margin: theme.spacing(0, 1, 0),
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
              fullWidth
              id={field.id.toString().toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        );
      case 'number':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              fullWidth
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        );
      case 'datepicker':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              fullWidth
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        );
      case 'select':
        return (
          <Grid item xs={4}>
            <TextField
              key={field.id.toString()}
              fullWidth
              id={field.id.toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        );
      case 'checkbox': {
        return (
          <Grid item xs={4}>
            <FormControl component="fieldset" className={classes.formControl} key={field.id.toString()}>
              <FormLabel component="legend">{field.label}</FormLabel>
              <FormGroup>
                {field.options.map((option:FieldOption, index:any) => (
                  <FormControlLabel
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
              fullWidth
              id={field.id.toString().toString()}
              label={field.label}
              value={field.value}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        );
    }
  }

  return (
    <div>
      <Typography variant="h4" align="left" className={classes.subtitles}>
        Patronato Psicológico Queretano I.A.P
      </Typography>
      <Typography variant="h5" align="left" className={classes.subtitles}>
        Folio: PPQ-
        {' '}
        {formInformation.recordId}
      </Typography>
      <Typography variant="h5" align="left" className={classes.subtitles}>
        { formInformation.name}
        {' '}
      </Typography>
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
            {fields.map(createComponent)}
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Firma del paciente"
                value="    "
                InputProps={{
                  readOnly: true,
                }}
              />
              <p>
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
              </p>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default PrintForm;
