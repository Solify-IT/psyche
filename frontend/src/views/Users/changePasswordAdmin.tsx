import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  TextField,
  Paper,
  Button,
}
  from '@material-ui/core';
import { toast } from 'react-toastify';
import { changePasswordAdmin } from 'src/api/user';
import LoadingSpinner from 'src/components/loadingSpinner';
import User from 'src/interfaces/user';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  paper: {
    marginTop: '50px',
  },
  submit: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    marginTop: '35px',
  },
}));

function ChangePasswordAdmin() {
  const classes = useStyles();
  const history = useHistory();
  const { id } : any = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<any>({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  function validPassword(password: string) : boolean {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})',
    );
    return strongRegex.test(password);
  }

  async function handleSubmit() {
    if (fields.newPassword !== fields.confirmNewPassword) {
      toast.warning('¡Las contraseñas no coinciden!');
    } else if (!validPassword(fields.newPassword)) {
      toast.warning('La contraseña debe ser mayor a 5 carácteres y contener al menos una minúscula, una mayúscula, un número y un carácter especial');
    } else {
      setLoading(true);
      try {
        const user : User = await changePasswordAdmin(id, fields.confirmNewPassword);
        console.log(user);
        toast.success(`¡Actualización completada! 😃`);
        history.push('/view-users');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('No se encontró un usuario con los datos proporcionados.');
        } else {
          toast.error('Ocurrió un error de conexión.');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <MainContent>
      <ContentTitle text="Cambiar Contraseña" />
      <Grid
        container
        justify="center"
        spacing={2}
      >
        <Grid
          item
          xs={8}
          component={Paper}
          className={classes.paper}
          elevation={6}
          square
        >
          <Grid className={classes.form} container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={8} sm={7}>
              <TextField
                variant="outlined"
                type="password"
                inputProps={{ minLength: 8 }}
                required
                fullWidth
                id="newPassword"
                value={fields.newPassword}
                label="Nueva Contraseña"
                name="newPassword"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={7}>
              <TextField
                variant="outlined"
                type="password"
                inputProps={{ minLength: 8 }}
                required
                fullWidth
                id="confirmNewPassword"
                value={fields.confirmNewPassword}
                label="Confirmar Contraseña"
                name="confirmNewPassword"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} className={classes.submit}>
              { loading ? <LoadingSpinner /> : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={fields.newPassword === '' || fields.confirmNewPassword === ''}
                  onClick={handleSubmit}
                >
                  Actualizar
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainContent>
  );
}
export default ChangePasswordAdmin;
