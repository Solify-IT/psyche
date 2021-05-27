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
import PrintIcon from '@material-ui/icons/Print';
import { getFormField } from 'src/api/forms';
import { useParams } from 'react-router';
import PatientFormField from 'src/interfaces/patientFormField';
import PatientForms from 'src/interfaces/patientForms';
import { Link } from 'react-router-dom';
import {
  Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink,
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
      width: '90%',
      textAlign: 'center',
    },
    logo: {
      height: '100px',
      width: '55.2px',
      marginRight: '15px',
      marginLeft: '40px',
      marginTop: '15px',
      marginBottom: '15px',
      alignSelf: 'flex-end',
    },
    item: {
      width: '80%',
      fontSize: 11,
      fontWeignt: 700,
    },
    single: {
      fontSize: 11,
    },
    movieContainer: {
      backgroundColor: '#f6f6f5',
      display: 'flex',
      flexDirection: 'row',
      padding: '5px',
      margin: '30px',
      fontSize: 20,
      borderColor: '#C94B72',
      borderRadius: '10px',
      borderWidth: 1,
      alignContent: 'center',
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '38px',
      fontSize: 15,
    },
    subtitle: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '7px',
      // marginLeft: '80px',
      fontSize: 10,
      textAlign: 'left',
    },
    priv: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 5,
      textAlign: 'left',
    },
    movieDetails: {
      display: 'flex',
      marginLeft: '6px',
    },
  });

  const classes = useStyles();
  function getFileName() {
    const d = new Date();
    return `${field.name}_PPQ_${field.recordId}_${d.toLocaleDateString()}.pdf`;
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={{
          color: 'black', textAlign: 'left', margin: 30, padding: 5, fontSize: 20,
        }}
        > */}
        <View style={styles.movieContainer}>
          <Image source="/images/loginImage.png" style={styles.logo} />
          <View style={styles.movieDetails}>
            <Text style={styles.title}>
              Patronato Psicológico Queretano I.A.P
            </Text>
            <br />
            <Text style={styles.subtitle}>
              { field.name}
            </Text>
            <br />
            <Text style={styles.subtitle}>
              Folio
              {': '}
              PPQ-
              {field.recordId}
            </Text>
          </View>
        </View>
        <View style={{
          color: 'black', textAlign: 'left', marginLeft: 30, padding: 5, fontSize: 12, lineHeight: 2,
        }}
        >
          <Text>
            <Box fontWeight="fontWeightBold" className={classes.box}>
              Fecha de registro
              {': '}
              {field.createdDate}
            </Box>
          </Text>
        </View>
        <View style={{
          color: 'black', textAlign: 'justify', marginLeft: 30, padding: 5, fontSize: 12,
        }}
        >
          <Text style={{ lineHeight: 2 }}>
            <Box fontWeight="fontWeightBold" className={classes.box}>
              Tipo de paciente
              {': '}
              {field.type}
            </Box>
          </Text>
        </View>
        <br />
        <View style={{
          color: 'black', textAlign: 'justify', marginLeft: 30, padding: 5, fontSize: 12, lineHeight: 2,
        }}
        >
          <Text style={styles.item}>
            { field.fields.map((fields:any) => (
              <View style={{
                flexDirection: 'column',
              }}
              >
                <Text>
                  { fields.label}
                  {':   '}
                  { fields.value}
                  {'      '}
                </Text>
              </View>
            ))}
          </Text>
        </View>
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
              fileName={getFileName()}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                // onClick={handleSubmit}
              >
                Imprimir
                <PrintIcon className={classes.icon} />
              </Button>
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
