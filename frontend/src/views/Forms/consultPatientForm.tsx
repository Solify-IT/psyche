import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
}
  from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import { getFormField } from 'src/api/forms';
import { useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import PatientForms from 'src/interfaces/patientForms';
import { Link } from 'react-router-dom';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

function ConsultPatientForm() {
  const [field, setField] = useState<PatientFormField>({
    id: 1,
    name: '',
    type: '',
    createdDate: '',
    recordId: 1,
    fields: Array<PatientForms>(),
  });
  const { id } : any = useParams();
  useEffect(() => {
    getFormField(id)
      .then((response:any) => {
        setField(response.data);
        console.log(response.data);
      })
      .catch((error:any) => {
        console.log(error);
      });
  }, [id]);

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
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
    },
    grid: {
      textAlign: 'left',
      fontSize: 16,
      paddingTop: '50px',
      paddingBottom: '0px',
    },
    grid2: {
      textAlign: 'left',
      fontSize: 16,
      paddingTop: '0px',
      paddingBottom: '50px',
      marginLeft: '0px',
    },
    box: {
      paddingBottom: '10px',
      marginLeft: '310px',
    },
    box2: {
      paddingBottom: '10px',
      marginLeft: '90px',
    },
    pdffff: {
      width: '100%',
      height: '100%',
    },
  }));

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const classes = useStyles();

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const App = () => (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );

  const handleSubmit = async () => {
    console.log('yeah');
    App();
    const canvas : any = document.getElementById('root');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ReactDOM.render(<App />, canvas);
    console.log('se logró');
  };

  return (
    <div className={classes.heroContent}>
      <main>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" className={classes.subtitles}>
              { field.name}
              {' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
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
              to={`/update-patient-form/${id}`}
            >
              Editar
              {'     '}
              <EditIcon className={classes.icon} />
            </Button>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Paper className={classes.paper}>
              <Grid container xs={12} lg={12}>
                <Grid item xs={6} lg={6} className={classes.grid}>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Folio:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Fecha de registro:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Tipo de paciente:
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6} className={classes.grid}>
                  <Box ml={15} className={classes.box2}>
                    PPQ-AP-
                    {field.recordId}
                  </Box>
                  <Box ml={15} className={classes.box2}>
                    { field.createdDate}
                  </Box>
                  <Box ml={15} className={classes.box2}>
                    { field.type}
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6} className={classes.grid2}>
                  { field.fields.map((fields:any) => (
                    <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                      { fields.label}
                      {': '}
                    </Box>
                  )) }
                </Grid>
                <Grid item xs={6} lg={6} className={classes.grid2}>
                  { field.fields.map((fields:any) => (
                    <Box ml={15} className={classes.box2}>
                      { fields.value}
                    </Box>
                  )) }
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default ConsultPatientForm;
