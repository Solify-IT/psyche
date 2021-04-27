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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
}
  from '@material-ui/core';
import {
  Delete,
  Edit,
  AddCircle,
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
  formControl: {
    marginLeft: '10px',
    marginTop: '15px',
    minWidth: 240,
  },
  addButton: {
    textAlign: 'right',
    marginRight: '4rem',
  },

}));

interface Options {
  name:string,
  value:string
}

interface Field {
  label: string;
  type: string;
  name: string;
  options: Array<Options>;
}

function Form() {
/* eslint-disable react/jsx-props-no-spreading */
  const classes = useStyles();
  const [newField, setNewField] = useState<Field>({
    label: '',
    type: 'text',
    name: '',
    options: [],
  });
  const {
    label, type, name, options,
  } = { ...newField };
  const [newOption, setNewOption] = useState('');

  const [list, setList] = useState<NewField[]>([]);

  const handleNewField = (event: React.ChangeEvent<any>) => {
    setNewField({ ...newField, [event.target.name]: event.target.value });
  };

  const handleNewOption = (event: React.ChangeEvent<any>) => {
    setNewOption(event.target.value);
  };

  const handleOptions = () => {
    const nameInput = 'options';
    const aux = [...newField.options];
    const value = {
      name: newOption,
      value: newOption.replace(/\s/g, ''),
    };
    aux.push(value);
    setNewField({ ...newField, [nameInput]: aux });
    setNewOption('');
  };

  const removeOption = (event: React.ChangeEvent<any>) => {
    const id = event.currentTarget.value;
    const aux = [...newField.options];
    aux.splice(id, 1);
    setNewField({ ...newField, options: aux });
  };

  function addField() {
    // Agregar a const list newField y no borrar los objetos ya almacenados dentro de List
    setList((prevFields) => [...prevFields, newField]);
    console.log(list);
    // Inicializar newField en vacio
    setNewField({
      label: '',
      name: '',
      type: 'text',
      options: [],
    });
  }

  const createRow = (field:any, index:any) => (
    <TableRow key={index}>
      <TableCell>{field.type}</TableCell>
      <TableCell>{field.label}</TableCell>
      <TableCell>{field.name}</TableCell>
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

  function showFields() {
    switch (type) {
      case 'text':
      case 'number':
      case 'datepicker':
        return (
          <>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="label"
                label="Etiqueta"
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
                id="name"
                label="Nombre Input"
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
          </>
        );
      case 'select':
        return (
          <>
            <Grid item xs={9}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="label"
                    label="Etiqueta"
                    name="label"
                    value={label}
                    onChange={handleNewField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre Input"
                    name="name"
                    value={name}
                    onChange={handleNewField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="options"
                    label="Opciones"
                    name="options"
                    className={classes.formControl}
                    value={newOption}
                    onChange={handleNewOption}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={handleOptions} title="Agregar Opción"><AddCircle fontSize="large" color="primary" /></IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Opción</TableCell>
                        <TableCell>Eliminar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {options.map((item, index) => (
                        <TableRow key={item.value}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell><IconButton onClick={removeOption} title="Eliminar" value={index}><Delete style={{ color: '#FF0000' }} /></IconButton></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.addButton}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={addField}
              >
                Agregar
              </Button>
            </Grid>

          </>

        );
      default:
        return (
          <p>default</p>
        );
    }
  }

  return (
    <div className={classes.heroContent}>
      <main>
        <Container>
          <Typography variant="h2" align="center">
            Crear Nuevo Form
          </Typography>

          <Grid container>
            <Grid item xs={12} component={Paper} className={classes.paper} elevation={6} square>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Tipo de Dato</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="type"
                      name="type"
                      value={type}
                      onChange={handleNewField}
                    >
                      <MenuItem value="text">Text Field</MenuItem>
                      <MenuItem value="number">Number Field</MenuItem>
                      <MenuItem value="select">Select</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="datepicker">Date Picker</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {showFields()}
              </Grid>
            </Grid>
            <Grid item xs={12} component={Paper} className={classes.paper} elevation={6} square>
              <div className={classes.table}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell> Tipo de Campo </TableCell>
                      <TableCell> Etiqueta </TableCell>
                      <TableCell> Nombre Input </TableCell>
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
      </main>
    </div>

  );
}
export default Form;
