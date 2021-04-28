import React, { useState } from 'react';
import {
  Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField,
} from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';
import FieldOption from 'src/interfaces/fieldOptions';
import { v4 as uuid4 } from 'uuid';

const useStyles = makeStyles(() => ({
  submit: {
    marginTop: '25px',
  },
  addButton: {
    textAlign: 'right',
    marginRight: '4rem',
  },
  formControl: {
    marginLeft: '10px',
    marginTop: '15px',
    minWidth: 240,
  },
}));

type AddSelectFieldProps = {
  setOptionsInForm: (options: FieldOption[]) => void;
};

function AddOptionField(props: AddSelectFieldProps) {
  const { setOptionsInForm } = props;
  const classes = useStyles();
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [optionText, setOptionText] = useState('');
  const [options, setOptions] = useState<FieldOption[]>([]);

  function removeOption(option: FieldOption) {
    const newOptions = options.filter((element) => element.key !== option.key);
    setOptionsInForm(newOptions);
    setOptions([...newOptions]);
  }

  function addOption() {
    if (optionText === '') {
      setNameValid(false);
      return;
    }
    const newOptions = options;
    newOptions.push({
      label: optionText,
      value: false,
      key: uuid4(),
    });
    setOptionsInForm(newOptions);
    setOptions([...newOptions]);
    setOptionText('');
    setNameValid(true);
  }
  return (
    <Grid container spacing={3} justify="space-between">
      <Grid item xs={3}>
        <TextField
          margin="normal"
          variant="outlined"
          required
          fullWidth
          id="options"
          label="Opciones"
          name="options"
          className={classes.formControl}
          value={optionText}
          onChange={(event) => setOptionText(event.target.value)}
          error={!nameValid}
          helperText={!nameValid && 'Este campo no puede estar vació.'}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          onClick={addOption}
          title="Agregar Opción"
        >
          <AddCircle fontSize="large" color="primary" />
        </IconButton>
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
            {
              options.map((item, index) => (
                <TableRow key={item.key}>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeOption(item)} title="Eliminar" value={index}>
                      <Delete style={{ color: '#FF0000' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Grid>

    </Grid>
  );
}
export default AddOptionField;
