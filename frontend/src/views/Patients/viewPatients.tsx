import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  Button,
  createMuiTheme,
  ThemeProvider,
}
  from '@material-ui/core';
import { DataGrid, GridToolbar, esES } from '@material-ui/data-grid';
import {
  Search,
}
  from '@material-ui/icons';
import Patient from 'src/interfaces/patient';
import { getPatients } from 'src/api/patient';
import { useHistory } from 'react-router';
import ContentTitle from 'src/components/contentTitle';
import User from 'src/interfaces/user';
import UserRole from 'src/fixtures/roles';
import { authenticationService } from 'src/api/authenticationService';
import LoadingSpinner from 'src/components/loadingSpinner';

type PatientsTableProps = {
  initialPatients: Patient[]
};

function PatientsTable(props: PatientsTableProps) {
  const { initialPatients } = props;
  const history = useHistory();

  const [patients] = useState<Patient[]>(initialPatients);
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    table: {
      width: '85%',
    },
    listUsers: {
      marginRight: 10,
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
    {
      field: 'especialistas',
      headerName: 'Especialistas',
      width: 300,
      renderCell: function createSelect(params:any) {
        return params.row.users.map((user: User, index: number) => (
          <div className={classes.listUsers} key={user.id}>
            {user.name}
            {params.row.users.length - 1 > index ? ', ' : '' }
          </div>
        ));
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
          <div className={classes.listUsers} key={user.id}>
            {user.name}
            {params.row.users.length - 1 > index ? ', ' : '' }
          </div>
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
        <ThemeProvider theme={(outerTheme) => createMuiTheme(outerTheme, esES)}>
          <Grid container justify="center" alignItems="center">
            <Grid item className={classes.table}>
              <div style={{ height: 800, width: '100%', marginTop: '20px' }}>
                <DataGrid
                  rows={patients}
                  columns={role === UserRole.Administrador ? adminColumns : columns}
                  pageSize={20}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </main>
  );
}

function ViewPatients() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPatients().then((response: any) => {
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    }).catch((error:any) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return <PatientsTable initialPatients={data} />;
}

export default ViewPatients;
