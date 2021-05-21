import React, { useEffect, useState } from 'react';
import {
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
import { useHistory, useParams } from 'react-router';
import ConsultProfile from 'src/interfaces/consultProfile';
import PatientArea from 'src/interfaces/patientArea';
import { authenticationService } from 'src/api/authenticationService';

function ConsultProfiles() {
  const [field, setField] = useState<ConsultProfile>({
    id: 1,
    username: ' ',
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
        console.log(response);
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
    history.replace(`/user-profile/update/${currentUser.user.id}`);
  };

  return (
    <div className={classes.heroContent}>
      <main>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" className={classes.subtitles}>
              Mi perfil
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={updateProfile}
              className={classes.button}
            >
              Editar
              {'     '}
              <EditIcon className={classes.icon} />
            </Button>
          </Grid>
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
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default ConsultProfiles;
