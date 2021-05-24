/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  makeStyles,
  Grid,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
} from '@material-ui/core';
import {
  Edit,
  Delete,
}
  from '@material-ui/icons';
import Users from 'src/interfaces/Users';
import Swal from 'sweetalert2';
import { deactivateAccount, getUsers } from '../../api/user';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  table: {
    marginTop: '30px',
  },
}));

function ViewUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const handleSubmit = async (id: number) => {
    setLoading(true);
    try {
      await deactivateAccount(id);
      Swal.fire(
        'Cuenta desactivada!',
        'El usuario no podrá acceder a partir de este momento.',
        'success',
      );
      history.replace('/view-users');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrio un error interno!',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function handleDelete(id:number) {
    Swal.fire({
      title: '¿Estás seguro de desactivar al usuario?',
      text: 'El usuario no podrá acceder al sistema',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('waiting');
        handleSubmit(id);
      }
    });
  }

  const classes = useStyles();
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    getUsers()
      .then((response:any) => {
        setUsers(Object.values(response));
        console.log(users);
      })
      .catch((error:any) => console.log(error));
  }, []);

  const createUser = (user:Users) => (
    <TableRow key={user.id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.zipCode}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>
        <IconButton>
          <Edit color="secondary" />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton disabled={!user.active} onClick={() => handleDelete(user.id!)}>
          <Delete style={{ color: '#FF0000' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <main>
      <div className={classes.heroContent}>
        <Container>
          <Typography variant="h2" align="center">
            Consultar Usuarios
          </Typography>
          <Grid container>
            <TableContainer component={Paper} className={classes.table}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> Nombre</TableCell>
                    <TableCell> Rol</TableCell>
                    <TableCell> Correo</TableCell>
                    <TableCell> Código Postal</TableCell>
                    <TableCell> Dirección</TableCell>
                    <TableCell> Modificar</TableCell>
                    <TableCell> Desactivar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(createUser)}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </div>
    </main>
  );
}
export default ViewUsers;
