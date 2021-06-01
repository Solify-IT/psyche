import React, { useEffect, useState } from 'react';
import {
  withStyles, Theme, createStyles, makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import Patient from 'src/interfaces';
import {
  optionsPsicologia, optionsPsiquiatria, optionsClinica, optionsAsesoria,
} from 'src/interfaces/options';
import 'src/App.css';
import { CSVLink } from 'react-csv';
import { getPatients } from 'src/api/patient';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

function getFileName() {
  const d = new Date();
  return `Pacientes_activos_${d.toLocaleDateString()}.csv`;
}

const headers = [
  { label: 'ID', key: 'id' },
  { label: 'Nombre', key: 'name' },
  { label: 'Apellidos', key: 'lastName' },
  { label: 'Fecha de inicio', key: 'startDate' },
  { label: 'Tipo de paciente', key: 'type' },
  { label: 'Género', key: 'gender' },
  { label: 'Teléfono', key: 'telephone' },
  { label: 'Dirección', key: 'address' },
  { label: 'Lugar de nacimiento', key: 'birthPlace' },
  { label: 'Fecha de nacimiento', key: 'birthDate' },
  { label: 'Código postal', key: 'postalCode' },
  { label: 'Número de expediente', key: 'recordId' },
];

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginLeft: '140px',
    overflowX: 'auto',
    margin: theme.spacing(1),
    fontSize: 16,
  },
  table: {
    width: '100%',
    fontSize: 16,
  },
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
  },
  formPatient: {
    margin: theme.spacing(2),
    fontSize: 16,
  },
  gridList: {
    width: '70%',
    height: 400,
    fontSize: 16,
  },
  grid: {
    textAlign: 'right',
    marginRight: '70px',
    fontSize: 16,
  },
  buttonCSV: {
    textDecoration: 'none',
    marginLeft: '30px',
    fontSize: 16,
  },
  subtitles: {
    marginTop: '10px',
    padding: '10px',
    paddingBottom: '0px',
  },
  subtitle: {
    fontSize: 16,
  },
  link: {
    textDecoration: 'none',
    fontSize: 16,
  },
  canal: {
    textAlign: 'right',
  },
}));

export default function CustomizedTables() {
  const [fields, setFields] = useState(optionsPsicologia);
  const [fieldsPs, setFieldsPs] = useState(optionsPsiquiatria);
  const [fieldsCl, setFieldsCl] = useState(optionsClinica);
  const [fieldsAs, setFieldsAs] = useState(optionsAsesoria);
  const [searchData, setSearchData] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [doctors, setDoctors] = useState<Patient[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [doctorsData, setDoctorsData] = useState<Patient[]>([]);
  const [value, setValue] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    getPatients().then((response:any) => {
      setPatients(response);
      setPatientsData(response);
    })
      .catch((error:any) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (optionsPsicologia !== []) {
      setFields(optionsPsicologia);
    }
    if (optionsPsiquiatria !== []) {
      setFieldsPs(optionsPsiquiatria);
    }
    if (optionsClinica !== []) {
      setFieldsCl(optionsClinica);
    }
    if (optionsAsesoria !== []) {
      setFieldsAs(optionsAsesoria);
    }
    if (value === ('')) {
      setPatients(patients);
      setDoctors(doctors);
      const patientFilter = Object.values(patientsData);
      const filteredUsers = patientFilter.filter(
        (patientConverter) => (patientConverter.name.toLowerCase()
          .includes(searchData.toLowerCase()))
        || (patientConverter.user.name.toLowerCase()
          .includes(searchData.toLowerCase())),
      );
      setPatients(filteredUsers);
    } else if (value === ('todos')) {
      setPatients(patients);
      setDoctors(doctors);
      const patientFilter = Object.values(patientsData);
      const filteredUsers = patientFilter.filter(
        (patientConverter) => (patientConverter.name.toLowerCase()
          .includes(searchData.toLowerCase()))
          || (patientConverter.user.name.toLowerCase()
            .includes(searchData.toLowerCase())),
      );

      setPatients(filteredUsers);
    } else {
      const patientFilter = Object.values(patientsData);
      const filteredUsers = patientFilter.filter(
        (patientConverter) => (patientConverter.name.toLowerCase()
          .includes(searchData.toLowerCase())
         && patientConverter.type.toLowerCase() === value.toLowerCase())
         || (patientConverter.type.toLowerCase() === value.toLowerCase()
         && patientConverter.name.toLowerCase()
           .includes(searchData.toLowerCase())
         && (patientConverter.user.name.toLowerCase()
           .includes(searchData.toLowerCase())))
        || (patientConverter.type.toLowerCase() === value.toLowerCase()
        && patientConverter.user.name.toLowerCase()
          .includes(searchData.toLowerCase())),
      );
      setPatients(filteredUsers);
    }
  }, [searchData, value, patientsData]);

  const handleSearch = (event: React.ChangeEvent<any>) => {
    setSearchData(event.target.value);
  };

  const addUser = (event: React.ChangeEvent<any>) => {
    const patientId = event.currentTarget.dataset.patientid;
    history.push(`/patient-canalization/${patientId}`);
  };

  return (
    <MainContent>
      <Grid item xs={12} className={classes.grid}>
        <ContentTitle text="Pacientes" />
        <CSVLink
          data={patients}
          filename={getFileName()}
          headers={headers}
          className={classes.buttonCSV}
        >
          <Button variant="contained" color="secondary" className={classes.buttonCSV}>
            Exportar a CSV
          </Button>
        </CSVLink>
      </Grid>
      <Paper className={classes.paper}>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Nombre del paciente o especialista"
            variant="outlined"
            value={searchData}
            onChange={handleSearch}
          />
          <FormControl className={classes.formPatient}>
            <FormLabel component="legend">Todos los pacientes</FormLabel>
            <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange}>
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formPatient}>
            <FormLabel component="legend">Psicología</FormLabel>
            {fields.map((field) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={field.id}>
                <FormControlLabel value={field.name} control={<Radio />} label={field.name} />
              </RadioGroup>
            ))}
          </FormControl>
          <FormControl className={classes.formPatient}>
            <FormLabel component="legend">Psiquiatría</FormLabel>
            {fieldsPs.map((field) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={field.id}>
                <FormControlLabel value={field.name} control={<Radio />} label={field.name} />
              </RadioGroup>
            ))}
          </FormControl>
          <FormControl className={classes.formPatient}>
            <FormLabel component="legend">Clínica</FormLabel>
            {fieldsCl.map((field) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={field.id}>
                <FormControlLabel value={field.name} control={<Radio />} label={field.name} />
              </RadioGroup>
            ))}
          </FormControl>
          <FormControl className={classes.formPatient}>
            <FormLabel component="legend">Asesoría</FormLabel>
            {fieldsAs.map((field) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={field.id}>
                <FormControlLabel value={field.name} control={<Radio />} label={field.name} />
              </RadioGroup>
            ))}
          </FormControl>
        </Grid>
        <GridList className={classes.gridList}>
          <Grid item xs={12}>
            <Table className={classes.table}>
              <TableBody>
                {patients.map((field) => (
                  <TableRow key={field.id}>
                    <StyledTableCell align="left" color="textPrimary">
                      <Link to={`/expediente/${field.recordId}`} className={classes.link}>
                        {field.name}
                        {' '}
                        {field.lastName}
                      </Link>
                      <>
                        <Typography color="textSecondary" className={classes.subtitle}>
                          {field.type}
                        </Typography>
                      </>
                      <>
                        <Typography color="textSecondary" className={classes.subtitle}>
                          Folio:
                          {field.recordId}
                        </Typography>
                      </>
                    </StyledTableCell>
                    <TableCell className={classes.canal}>
                      {field.userId
                        ? (
                          <>
                            <Typography color="textSecondary" className={classes.subtitle}>
                              Nombre del Doctor:
                              {' '}
                              {field.user.name}
                            </Typography>
                          </>
                        )
                        : <Button variant="contained" color="primary" className={classes.canal} data-patientId={field.recordId?.toString()} onClick={addUser}>Canalizar</Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </GridList>
      </Paper>
    </MainContent>
  );
}
