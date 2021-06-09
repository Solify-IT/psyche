import React, { useState } from 'react';
import {
  makeStyles,
  Grid,
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
import { registerForm } from 'src/api/forms';
import Form from 'src/interfaces/form';
import {
  optionsAsesoria, optionsClinica, optionsPsicologia, optionsPsiquiatria,
} from 'src/interfaces/options';
import { useHistory } from 'react-router';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import Swal from 'sweetalert2';

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
      Swal.fire(
        '¡Formulario Guardado!',
        'Se ha guardado el formulario de manera exitosa',
        'success',
      );
      // TODO: Redireccionar a el detail de la pagina
      history.replace('/');
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error al registrar el perfil de preferencias!',
      });
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
      case 'Campo de texto':
      case 'text':
      case 'Campo de número':
      case 'number':
      case 'Firma':
      case 'signature':
      case 'Selección de fecha':
        return null;
      case 'datepicker':
        return null;

      case 'Selección múltiple':
      case 'checkbox':
      case 'Selección de opciones':
        return (
          <AddOptionField setOptionsInForm={setOptions} />
        );
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
    <MainContent>
      <ContentTitle text="Crear Nuevo Formulario" />
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
                <MenuItem value="Campo de texto">Campo de texto</MenuItem>
                <MenuItem value="Campo de número">Campo de número</MenuItem>
                <MenuItem value="Selección de opciones">Selección de opciones</MenuItem>
                <MenuItem value="Selección múltiple">Selección múltiple</MenuItem>
                <MenuItem value="Selección de fecha">Selección de fecha</MenuItem>
                <MenuItem value="Firma">Firma</MenuItem>
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

    </MainContent>

  );
}
export default NewForm;
