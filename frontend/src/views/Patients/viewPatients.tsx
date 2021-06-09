/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Container,
}
  from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {
  Search,
}
  from '@material-ui/icons';
import Patient from 'src/interfaces/patient';
import { getPatients } from 'src/api/patient';
import { getForms } from 'src/api/forms';
import PromiseLoader from 'src/utils/promiseLoader';
import { useHistory } from 'react-router';
import ContentTitle from 'src/components/contentTitle';
import User from 'src/interfaces/user';
import UserRole from 'src/fixtures/roles';
import { authenticationService } from 'src/api/authenticationService';

type PatientsTableProps = {
  initialPatients: Patient[]
};

function PatientsTable(props: PatientsTableProps) {
  const { initialPatients } = props;
  const history = useHistory();

  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    table: {
      width: '85%',
    },
  }));
  const classes = useStyles();
  const { role } = authenticationService.currentUserValue.user;

  const addUser = (event: React.ChangeEvent<any>) => {
    const patientId = event.currentTarget.dataset.patientid;
    history.push(`/patient-canalization/${patientId}`);
  };

  const viewRecord = (event: React.ChangeEvent<any>) => {
    const patientId = event.currentTarget.dataset.patientid;
    history.push(`/expediente/${patientId}`);
  };

  const columns = [
    {
      field: 'recordId', headerName: 'Follio', width: 110,
    },
    {
      field: 'name', headerName: 'Nombre', width: 250,
    },
    {
      field: 'lastName', headerName: 'Apellido (s)', width: 350,
    },
    {
      field: 'type', headerName: 'Área', width: 400,
    },
    {
      field: 'consultar',
      headerName: 'Consultar',
      width: 145,
      renderCell: function createSelect(params:any) {
        return (
          <Search data-patientid={params.row.recordId.toString()} onClick={viewRecord} fontSize="large" style={{ color: '#A3529A' }} />
        );
      },
    },
  ];

  const adminColumns = [
    {
      field: 'recordId', headerName: 'Follio', width: 110,
    },
    {
      field: 'name', headerName: 'Nombre', width: 250,
    },
    {
      field: 'lastName', headerName: 'Apellido (s)', width: 350,
    },
    {
      field: 'type', headerName: 'Área', width: 400,
    },
    {
      field: 'consultar',
      headerName: 'Consultar',
      width: 145,
      renderCell: function createSelect(params:any) {
        return (
          <Search data-patientid={params.row.recordId.toString()} onClick={viewRecord} fontSize="large" style={{ color: '#A3529A' }} />
        );
      },
    },
    {
      field: 'especialistas',
      headerName: 'Especialistas',
      width: 300,
      renderCell: function createSelect(params:any) {
        return params.row.users.map((user: User, index: number) => (
          <Typography variant="h6" color="primary" display="block">
            {user.name}
            {params.row.users.length - 1 > index ? ',  ' : '' }
          </Typography>
        ));
      },
    },
    {
      field: 'canalizar',
      headerName: 'Canalizar',
      width: 300,
      renderCell: function createSelect(params:any) {
        return (
          <Button variant="contained" color="primary" data-patientid={params.row.recordId.toString()} onClick={addUser}>
            Canalizar
          </Button>
        );
      },
    },
  ];

  return (
    <main>
      <div className={classes.heroContent}>
        <ContentTitle text="Consultar Pacientes" />
        <Grid container justify="center" alignItems="center">
          <Grid item className={classes.table}>
            <div style={{ height: 800, width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={patients}
                columns={[UserRole.Administrador].includes(role) ? adminColumns : columns}
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

function ViewPatients() {
  const promise = getPatients();
  const content = PromiseLoader(
    promise,
    (data: any) => <PatientsTable initialPatients={data} />,
    (error) => {
      switch (error.response?.status) {
        case 404:
          return <h2>No se encontraron pacientes</h2>;
        default:
          return <h2>Ocurrió un error de conexión.</h2>;
      }
    },
  );
  return content;
}

export default ViewPatients;
