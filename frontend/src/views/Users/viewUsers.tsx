import React, { useState, useEffect } from 'react';
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
  Fab,
} from '@material-ui/core';
import {
  Edit,
  Delete,
  Add,
}
  from '@material-ui/icons';
import Users from 'src/interfaces/Users';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api/user';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 3),
  },
  table: {
    marginTop: '30px',
  },
}));

function ViewUsers() {
  const classes = useStyles();
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    getUsers()
      .then((response:any) => {
        setUsers(Object.values(response));
      })
      .catch((error:any) => console.log(error));
  }, []);

  const history = useHistory();
  const updateProfile = (event: React.ChangeEvent<any>) => {
    const { userid } = event.currentTarget.dataset;
    history.replace(`/user-update/${userid}`);
  };

  const createUser = (user:Users) => (
    <TableRow key={user.id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.zipCode}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>
        <IconButton data-userid={user.username} onClick={updateProfile}>
          <Edit color="secondary" />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton>
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
          <Grid container justify="flex-end">
            <Fab color="primary" aria-label="add" component={Link} to="/register-user">
              <Add />
            </Fab>
          </Grid>
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
