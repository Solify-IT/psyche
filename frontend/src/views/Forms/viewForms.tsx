import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
}
  from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {
  Edit,
  Delete,
}
  from '@material-ui/icons';
import Form from 'src/interfaces/form';
import { getForms } from 'src/api/forms';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 6),
  },
  table: {
    width: '85%',
  },
}));

function ViewForms() {
  const classes = useStyles();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    getForms()
      .then((response:any) => {
        setForms(response.data);
        console.log(response.data);
      })
      .catch((error:any) => {
        console.log(error);
      });
  }, []);

  function updateForm(event: React.ChangeEvent<any>) {
    console.log(event);
  }

  function deleteForm(event: React.ChangeEvent<any>) {
    console.log(event);
  }

  const columns = [
    {
      field: 'name', headerName: 'Nombre', width: 400, headerClassName: 'super-app-theme--details',
    },
    {
      field: 'type', headerName: 'Área', width: 400, headerClassName: 'super-app-theme--details',
    },
    {
      field: 'update',
      headerName: 'Modificar',
      width: 170,
      headerClassName: 'super-app-theme--dropdown',
      renderCell: function createSelect(params:any) {
        return (
          <IconButton onClick={updateForm} data-formid={params.id.toString()}>
            <Edit color="secondary" />
          </IconButton>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      width: 170,
      headerClassName: 'super-app-theme--dropdown',
      renderCell: function createSelect(params:any) {
        return (
          <IconButton onClick={deleteForm} data-formid={params.id.toString()}>
            <Delete color="secondary" style={{ color: '#FF0000' }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <main>
      <div className={classes.heroContent}>
        <Typography variant="h2" align="center">
          Consultar Forms
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Grid item className={classes.table}>
            <div style={{ height: 800, width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={forms}
                columns={columns}
                pageSize={20}
                // filterModel={riceFilterModel}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </main>
  );
}

export default ViewForms;
