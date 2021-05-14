import React, { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
}
  from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { consultProfile } from 'src/api/user';
import { useParams } from 'react-router';
import ConsultProfile from 'src/interfaces/consultProfile';
import PatientArea from 'src/interfaces/patientArea';

function ConsultProfiles() {
  const [field, setField] = useState<ConsultProfile>({
    id: 1,
    username: '',
    name: '',
    address: '',
    zipCode: '',
    password: '',
    email: '',
    role: '',
    firstTime: true,
    active: true,
    professionalLicense: '',
    patientAreas: Array<PatientArea>(),

  });
  const { id } : any = useParams();
  useEffect(() => {
    consultProfile(id)
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
      padding: theme.spacing(4, 0, 2),
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
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
    },
    icon: {
      paddingLeft: '5px',
    },
    grid: {
      textAlign: 'left',
      fontSize: 16,
      paddingLeft: '40px',
      paddingTop: '50px',
      paddingBottom: '50px',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <main>
        <Container>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" className={classes.subtitles}>
              Mi perfil
            </Typography>
          </Grid>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Editar
                {'     '}
                <EditIcon className={classes.icon} />
              </Button>
            </Grid>
            <br />
            <Grid container xs={12} lg={12}>
              <Grid item xs={3} lg={3} className={classes.grid}>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Usuario:
                </Box>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Nombre:
                </Box>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Dirección:
                </Box>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Código postal:
                </Box>
              </Grid>
              <Grid item xs={2} lg={2} className={classes.grid}>
                <Box>
                  {field.username}
                </Box>
                <Box>
                  {field.name}
                </Box>
                <Box>
                  { field.address}
                </Box>
                <Box>
                  { field.zipCode}
                </Box>
              </Grid>
              <Grid item xs={4} lg={4} className={classes.grid}>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Correo electrónico:
                </Box>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Rol:
                </Box>
                <Box fontWeight="fontWeightBold" ml={15}>
                  Cédula profesional:
                </Box>
              </Grid>
              <Grid item xs={2} lg={2} className={classes.grid}>
                <Box>
                  {field.email}
                </Box>
                <Box>
                  { field.role}
                </Box>
                <Box>
                  { field.professionalLicense}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </div>
  );
}

export default ConsultProfiles;
