import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Typography,
}
  from '@material-ui/core';
import FieldOption from 'src/interfaces/fieldOptions';
import Field from 'src/interfaces/field';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import { getFormField } from 'src/api/forms';
import { useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import { Link } from 'react-router-dom';
import './print.css';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

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
  firma: {
    fontSize: '13px',
    textAlign: 'center',
    font: 'inherit',
  },
  gridFirma: {
    bottom: '100px',
    width: '100%',
  },
  divider: {
    marginTop: '100px',
    background: 'black',
  },
}));

function ConsultPatientForm() {
  const { formId } : any = useParams();
  const classes = useStyles();
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

  function createComponent(field:any) {
    switch (field.type) {
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
      case 'Campo de texto':
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
      case 'Campo de número':
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
      case 'Selección de fecha':
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
      case 'Selección de opciones':
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
      case 'Selección múltiple': {
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
          <TextField
            key={field.id.toString()}
            fullWidth
            id={field.id.toString().toString()}
            label={field.label}
            value={field.value}
            InputProps={{
              readOnly: true,
              style: { textAlign: 'center' },
            }}
          />
        );
    }
  }

  return (
    <MainContent>
      <ContentTitle text={formInformation.name} />
      <div className={classes.heroContent}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                component={Link}
                to={`/patient-print/${formId}`}
              >
                Imprimir
                <PrintIcon className={classes.icon} />
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                component={Link}
                to={`/update-patient-form/${formId}`}
              >
                Editar
                {'     '}
                <EditIcon className={classes.icon} />
              </Button>
            </Grid>
            {fields.filter((field) => field.type !== 'signature' && field.type !== 'Firma').map(createComponent)}
          </Grid>
        </Container>
      </div>
    </MainContent>
  );
}

export default ConsultPatientForm;
