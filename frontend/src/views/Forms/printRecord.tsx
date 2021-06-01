import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import { listFormsWithRecordId } from 'src/api/forms';
import { useParams } from 'react-router';
// import PatientFormField from 'src/interfaces/patientFormField';
import './print.css';
// import Field from 'src/interfaces/field';
import Form from 'src/interfaces/form';

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
    position: 'absolute',
    bottom: '20px',
    width: '100%',
  },
  firma: {
    fontSize: '13px',
    textAlign: 'center',
    font: 'inherit',
  },
  gridFirma: {
    position: 'absolute',
    bottom: '100px',
    width: '100%',
  },
}));

function PrintRecord() {
  const classes = useStyles();
  const [forms, setForms] = useState<Form[]>([]);
  console.log(forms);
  // const history = useHistory();
  const [formInformation, setFormInformation] = useState({
    id: 0,
    name: '',
    recordId: 1,
    type: '',
    createdData: '',
  });
  console.log(formInformation);
  const { recordId } : any = useParams();
  console.log(recordId);
  useEffect(() => {
    listFormsWithRecordId(recordId)
      .then((response:any) => {
        console.log(response);
        setForms(response);
        setFormInformation(response.data);
      })
      .catch((error:any) => console.log(error));
  }, [recordId]);

  return (
    <div className={classes.heroContent}>
      <main>
        <div>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} />
              <Grid container justify="center" alignItems="center">
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

export default PrintRecord;
