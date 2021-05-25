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
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Divider,
}
  from '@material-ui/core';

import Field from 'src/interfaces/field';
import FieldRow from 'src/components/Forms/NewForm/FieldRow';
import AddOptionField from 'src/components/Forms/NewForm/AddOptionField';
import FieldOption from 'src/interfaces/fieldOptions';
import { v4 as uuid4 } from 'uuid';
import registerForm from 'src/api/forms';
import Form from 'src/interfaces/form';
import { toast } from 'react-toastify';
import {
  optionsAsesoria, optionsClinica, optionsPsicologia, optionsPsiquiatria,
} from 'src/interfaces/options';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  paper: {
    marginTop: '20px',
    padding: '30px',
  },
  submit: {
    textAlign: 'center',
  },
  table: {
    padding: '10px',
  },
  formControl: {
    marginTop: '16px',
    marginLeft: '5px',
    textAlign: 'left',
  },
  addButton: {
    textAlign: 'right',
    marginRight: '4rem',
  },
  group: {
    marginTop: '16px',
    marginLeft: '20px',
    textAlign: 'left',
  },

}));

function NewForm() {
/* eslint-disable react/jsx-props-no-spreading */
  const classes = useStyles();
  const history = useHistory();
  const [newField, setNewField] = useState<Field>({
    label: '',
    type: '',
    key: uuid4(),
    options: [],
    value: '',
  });

  const {
    label, type,
  } = { ...newField };

  const [fieldList, setList] = useState<Field[]>([]);

  const [labelValid, setLabelValid] = useState<boolean>(true);

  const [titleValid, setTitleValid] = useState<boolean>(true);

  const [title, setTitle] = useState<string>('');
  const [formType, setFormType] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleNewField = (event: React.ChangeEvent<any>) => {
    setNewField({ ...newField, [event.target.name]: event.target.value });
  };

  const handleNewType = (event: React.ChangeEvent<any>) => {
    setFormType(event.target.value);
  };

  const handleTitle = (event: React.ChangeEvent<any>) => {
    setTitle(event.target.value);
  };

  async function submit() {
    if (title === '') {
      setTitleValid(false);
      return;
    }

    setTitleValid(true);
    const form : Form = { name: title, fields: fieldList, type: formType };
    setLoading(true);

    try {
      await registerForm(form);
      toast.success('Se ha registrado la nueva encuesta exitosamente.');
      // TODO: Redireccionar a el detail de la pagina
      history.replace('/');
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al intentar registrar el form');
    } finally {
      setLoading(false);
    }
  }

  function setOptions(newOptions: FieldOption[]) {
    newField.options = newOptions;
  }

  function removeField(field: Field) {
    const newFieldList = fieldList.filter((element) => element.key !== field.key);
    setList(newFieldList);
  }
  const createSelect = (option:any) => (
    <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>
  );

  function addField() {
    if (label === '') {
      setLabelValid(false);
      return;
    }

    setLabelValid(true);
    // Agregar a const list newField y no borrar los objetos ya almacenados dentro de List
    setList((prevFields) => [...prevFields, newField]);
    // Inicializar newField en vacio
    setNewField({
      label: '',
      key: uuid4(),
      type: '',
      options: [],
    });
  }

  function renderCustomForm() {
    switch (type) {
      case 'text':
      case 'number':
      case 'datepicker':
        return null;

      case 'checkbox':
      case 'select':
        return (
          <AddOptionField setOptionsInForm={setOptions} />
        );

      default:
        return null;
    }
  }

  function FormTable() {
    return (
      <Grid container justify="center" component={Paper} className={classes.paper} elevation={6} square>
        <Grid item xs={12}>
          <div className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Tipo de Campo </TableCell>
                  <TableCell> Etiqueta </TableCell>
                  <TableCell> Opciones </TableCell>
                  <TableCell> Eliminar </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fieldList.map(
                  (value, index) => (
                    <FieldRow
                      key={value.label}
                      field={value}
                      index={index}
                      removeField={removeField}
                    />
                  ),
                )}
              </TableBody>
            </Table>
          </div>

        </Grid>
        {loading
          ? <CircularProgress />
          : (
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={submit}
                className={classes.submit}
                disabled={fieldList.length === 0 || loading}
              >
                Registrar
              </Button>
            </Grid>
          )}
      </Grid>
    );
  }
  return (
    <div className={classes.heroContent}>
      <main>
        <Container>
          <Typography variant="h2" align="center">
            Crear Nuevo Form
          </Typography>
          <Grid container justify="center">
            <Grid item xs={10} component={Paper} className={classes.paper} elevation={6} justify="center">
              <Grid container spacing={5}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Nombre de formato"
                    onChange={handleTitle}
                    value={title}
                    name="name"
                    error={!titleValid}
                    helperText={!titleValid && 'Este campo no puede estar vació.'}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel shrink id="type">Tipo</InputLabel>
                  <Select
                    variant="outlined"
                    labelId="type"
                    required
                    fullWidth
                    label="Clasificación"
                    name="type"
                    value={formType}
                    onChange={handleNewType}
                  >
                    {optionsPsiquiatria.map(createSelect)}
                    <Divider />
                    {optionsAsesoria.map(createSelect)}
                    <Divider />
                    {optionsClinica.map(createSelect)}
                    <Divider />
                    {optionsPsicologia.map(createSelect)}
                    <Divider />
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel shrink>Tipo de Dato</InputLabel>
                  <Select
                    variant="outlined"
                    fullWidth
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
                </Grid>
                <Grid item xs={12} sm={8}>
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
                    error={!labelValid}
                    helperText={!labelValid && 'Este campo no puede estar vació.'}
                  />
                </Grid>
                {renderCustomForm()}
                <Grid item xs={12} className={classes.submit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={addField}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <FormTable />

        </Container>
      </main>
    </div>

  );
}
export default NewForm;
