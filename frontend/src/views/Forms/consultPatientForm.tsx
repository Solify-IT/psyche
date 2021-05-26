import React, { useEffect, useState } from 'react';
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
import { getFormField } from 'src/api/forms';
import { useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import PatientForms from 'src/interfaces/patientForms';
import { Link } from 'react-router-dom';
import {
  Page, Text, View, Document, StyleSheet, PDFDownloadLink,
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
        console.log(response.data.fields);
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
      backgroundColor: 'white',
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
        <View style={{
          color: 'black', textAlign: 'center', margin: 30, padding: 5, fontSize: 20,
        }}
        >
          <Text>
            { field.name}
          </Text>
        </View>
        <View style={{
          color: 'black', textAlign: 'left', marginLeft: 30, padding: 5, fontSize: 12, lineHeight: 3,
        }}
        >
          <Text>
            <Box fontWeight="fontWeightBold" className={classes.box}>
              Folio
              {': '}
              PPQ-AP-
              {field.recordId}
              {'                '}
              Fecha de registro
              {': '}
              {field.createdDate}
            </Box>
          </Text>
        </View>
        <View style={{
          color: 'black', textAlign: 'left', marginLeft: 30, padding: 5, fontSize: 12,
        }}
        >
          <Text>
            <Box fontWeight="fontWeightBold" className={classes.box}>
              Tipo de paciente
              {': '}
              {field.type}
            </Box>
          </Text>
        </View>
        <br />
        <View style={{
          color: 'black', textAlign: 'left', marginLeft: 30, padding: 5, fontSize: 12, lineHeight: 2,
        }}
        >
          <Text>
            { field.fields.map((fields:any) => (
              <Box fontWeight="fontWeightBold" className={classes.box}>
                { fields.label}
                {': '}
                { fields.value}
                {'                '}
              </Box>
            )) }
          </Text>
        </View>
        <br />
      </Page>
    </Document>
  );

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
            <PDFDownloadLink
              document={<MyDocument />}
              fileName="movielist.pdf"
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: 'secondary',
                backgroundColor: 'secondary',
                border: '1px solid #4a4a4a',
              }}
            >
              {
               ({ loading }) => (loading ? 'Loading' : 'Imprimir')
              }
            </PDFDownloadLink>
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
