import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  Button,
  Paper,
  Box,
}
  from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { consultProfile } from 'src/api/user';
import { useHistory, useParams } from 'react-router';
import ConsultProfile from 'src/interfaces/consultProfile';
import PatientArea from 'src/interfaces/patientArea';
import { authenticationService } from 'src/api/authenticationService';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

function ConsultProfiles() {
  const [field, setField] = useState<ConsultProfile>({
    id: 1,
    username: ' ',
    name: '',
    lastName: '',
    address: '',
    telephone: '',
    zipCode: '',
    password: '',
    email: '',
    role: '',
    firstTime: true,
    active: true,
    professionalLicense: '',
    patientAreas: Array<PatientArea>(),
    workSchedule: '',

  });
  const { id } : any = useParams();
  useEffect(() => {
    consultProfile(id)
      .then((response:any) => {
        setField(response.data);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error:any) => {
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
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    box: {
      paddingBottom: '10px',
    },
  }));

  const classes = useStyles();
  const currentUser = authenticationService.currentUserValue;

  const history = useHistory();
  const updateProfile = () => {
    history.push(`/user-profile/update/${currentUser.user.id}`);
  };

  const modifyAreas = () => {
    history.push('/modify-profile');
  };

  const newPassword = () => {
    history.push('/change-password/');
  };

  function Psicologo() {
    if (currentUser.user.role === 'Psicólogo') {
      return (
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={modifyAreas}
        >
          Modificar Áreas
          {'     '}
          <EditIcon className={classes.icon} />
        </Button>
      );
    }
  }

  function Profesional() {
    switch (field.professionalLicense) {
      case '':
        return (
          <Grid item lg={12} xs={12}>
            <Paper className={classes.paper}>
              <Grid container xs={12} lg={12}>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Usuario:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Nombre:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Apellidos:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Dirección:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Teléfono:
                  </Box>
                </Grid>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box className={classes.box}>
                    {field.username}
                  </Box>
                  <Box className={classes.box}>
                    {field.name}
                  </Box>
                  <Box className={classes.box}>
                    {field.lastName}
                  </Box>
                  <Box className={classes.box}>
                    { field.address}
                  </Box>
                  <Box className={classes.box}>
                    {field.telephone}
                  </Box>
                </Grid>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Rol:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Código postal:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Correo electrónico:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Cédula profesional:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Horarios:
                  </Box>
                </Grid>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box className={classes.box}>
                    {field.role}
                  </Box>
                  <Box className={classes.box}>
                    { field.zipCode}
                  </Box>
                  <Box className={classes.box}>
                    { field.email}
                  </Box>
                  <Box className={classes.box}>
                    Pendiente
                  </Box>
                  <Box className={classes.box}>
                    { field.workSchedule}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      default:
        return (
          <Grid item lg={12} xs={12}>
            <Paper className={classes.paper}>
              <Grid container xs={12} lg={12}>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Usuario:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Nombre:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Dirección:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Código postal:
                  </Box>
                </Grid>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box className={classes.box}>
                    {field.username}
                  </Box>
                  <Box className={classes.box}>
                    {field.name}
                    {' '}
                    {field.lastName}
                  </Box>
                  <Box className={classes.box}>
                    { field.address}
                  </Box>
                  <Box className={classes.box}>
                    { field.zipCode}
                  </Box>
                </Grid>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Rol:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Correo electrónico:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Cédula profesional:
                  </Box>
                  <Box fontWeight="fontWeightBold" ml={15} className={classes.box}>
                    Horarios:
                  </Box>
                </Grid>
                <Grid item xs={3} lg={3} className={classes.grid}>
                  <Box className={classes.box}>
                    {field.role}
                  </Box>
                  <Box className={classes.box}>
                    { field.email}
                  </Box>
                  <Box className={classes.box}>
                    { field.professionalLicense}
                  </Box>
                  <Box className={classes.box}>
                    { field.workSchedule}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
    }
  }
  return (
    <div className={classes.heroContent}>
      <MainContent>
        <Grid container>
          <Grid item xs={12}>
            <ContentTitle text="Mi Perfil" />
          </Grid>
          <Grid item xs={12}>
            {Psicologo()}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={newPassword}
            >
              Cambiar Contraseña
              {'     '}
              <EditIcon className={classes.icon} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={updateProfile}
              className={classes.button}
            >
              Modificar Perfil
              {'     '}
              <EditIcon className={classes.icon} />
            </Button>
          </Grid>
          {Profesional()}
        </Grid>
      </MainContent>
    </div>
  );
}

export default ConsultProfiles;
