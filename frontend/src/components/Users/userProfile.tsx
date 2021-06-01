import React from 'react';
import {
  makeStyles,
  Grid,
  Button,
  Paper,
  Box,
}
  from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import { authenticationService } from 'src/api/authenticationService';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import User from 'src/interfaces/user';

type UserProfileProps = {
  user: User;
};

function UserProfile(props: UserProfileProps) {
  const { user } = props;

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

  const newPassword = () => {
    history.push('/change-password/');
  };

  return (
    <MainContent>
      <Grid container>
        <Grid item xs={12}>
          <ContentTitle text="Mi perfil" />
        </Grid>
        <Grid item xs={12}>
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
            Editar Perfil
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
                  {user.username}
                </Box>
                <Box className={classes.box}>
                  {user.name}
                </Box>
                <Box className={classes.box}>
                  { user.address}
                </Box>
                <Box className={classes.box}>
                  { user.zipCode}
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
                  {user.role}
                </Box>
                <Box className={classes.box}>
                  { user.email}
                </Box>
                <Box className={classes.box}>
                  { user.professionalLicense}
                </Box>
                <Box className={classes.box}>
                  { user.workSchedule}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default UserProfile;
