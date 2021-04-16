import React, { useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
}
  from '@material-ui/core';
import {
  Delete,
  Edit,
}
  from '@material-ui/icons';
import NewField from '../interfaces/form';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  paper: {
    marginTop: '20px',
    padding: '20px',
  },
  submit: {
    marginTop: '25px',
  },
  table: {
    padding: '10px',
  },
}));

function Form() {
/* eslint-disable react/jsx-props-no-spreading */
  const classes = useStyles();
  const [newField, setNewField] = useState({
    label: '',
    type: '',
    name: '',
  });
  const { label, type, name } = { ...newField };

  const [list, setList] = useState<NewField[]>([]);

  const handleNewField = (event: React.ChangeEvent<any>) => {
    setNewField({ ...newField, [event.target.name]: event.target.value });
  };

  function addField() {
    // Agregar a const list newField y no borrar los objetos ya almacenados dentro de List
    setList((prevFields) => [...prevFields, newField]);
    console.log(list);
    // Inicializar newField en vacio
    setNewField({
      label: '',
      name: '',
      type: '',
    });
  }

  const createRow = (field:any, index:any) => (
    <TableRow key={index}>
      <TableCell>{field.label}</TableCell>
      <TableCell>{field.name}</TableCell>
      <TableCell>{field.type}</TableCell>
      <TableCell>
        {' '}
        <IconButton><Edit style={{ color: '#9FC793' }} /></IconButton>
      </TableCell>
      <TableCell>
        {' '}
        <IconButton><Delete style={{ color: '#FF0000' }} /></IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <div className={classes.heroContent}>
      <Container>
        <Typography variant="h2" align="center">
          Crear Nuevo Form
        </Typography>

        <Grid container>
          <Grid item xs={12} component={Paper} className={classes.paper} elevation={6} square>

            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="label"
                  label="Nombre"
                  name="label"
                  value={label}
                  onChange={handleNewField}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="type"
                  label="Tipo de Dato"
                  name="type"
                  value={type}
                  onChange={handleNewField}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Etiqueta"
                  name="name"
                  value={name}
                  onChange={handleNewField}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={addField}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} component={Paper} className={classes.paper} elevation={6} square>
            <div className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Nombre del Campo </TableCell>
                    <TableCell> Valor </TableCell>
                    <TableCell> Etiqueta </TableCell>
                    <TableCell> Editar </TableCell>
                    <TableCell> Eliminar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map(createRow)}
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>

  );
}
export default Form;
