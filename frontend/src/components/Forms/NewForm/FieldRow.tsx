import React from 'react';
import {
  IconButton, TableCell, TableRow,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Field from 'src/interfaces/field';

type FieldRowProps = {
  field: Field,
  index: number,
  removeField: (field: Field) => void,
};

function FieldRow(props: FieldRowProps) {
  const { field, index, removeField } = props;
  return (
    <TableRow key={index}>
      <TableCell>
        {field.type}
      </TableCell>
      <TableCell>{field.label}</TableCell>
      <TableCell>
        {(field.options.length === 0) ? 'N/A'
          : (
            <ul>
              { field.options.map((option) => <li>{option.label}</li>)}
            </ul>
          )}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => removeField(field)}>
          <Delete style={{ color: '#FF0000' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
export default FieldRow;
