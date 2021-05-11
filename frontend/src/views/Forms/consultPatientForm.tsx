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
import { Link } from 'react-router-dom';
import Patient from 'src/interfaces';
import {
  optionsPsicologia, optionsPsiquiatria, optionsClinica, optionsAsesoria,
} from 'src/interfaces/options';
import { getPatients } from '../../api/patient';

/* const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: FilmOptionType) => option.name,
});
interface FilmOptionType {
  name: string;
} */

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginLeft: '140px',
    overflowX: 'auto',
    margin: theme.spacing(1),
  },
  table: {
    width: 940,
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
  frm: {
    margin: theme.spacing(2),
  },
  gridList: {
    width: 950,
    height: 400,
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
  // const [doctor, setDoctor] = useState<any[]>([]);
  // const [doctorData, setDoctorData] = useState<any[]>([]);
  /* const getDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8000/doctors');
      const jsonData = await response.json();
      console.log(jsonData);
      setDoctor(jsonData);
      setDoctorData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }; */
  const [value, setValue] = useState('Psicología Adulto');
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    getPatients().then((response:any) => {
      console.log(response);
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
    if (value === (' ')) {
      setPatients(patients);
    } else {
      const patientFilter = Object.values(patientsData);
      // const doctorFilter = Object.values(doctorData);
      const filteredUsers = patientFilter.filter(
        (patientConverter) => (patientConverter.name.toLowerCase()
          .includes(searchData.toLowerCase())
         && patientConverter.type.toLowerCase() === value.toLowerCase())
         || (patientConverter.type.toLowerCase() === value.toLowerCase()
         && patientConverter.name.toLowerCase()
           .includes(searchData.toLowerCase())),
      );
      /* const filteredDoctors = doctorFilter.filter(
        (doctorConverter) => (doctorConverter.name.toLowerCase()
          .includes(searchData.toLowerCase())
        ),
      ); */

      setPatients(filteredUsers);
      // setDoctor(filteredDoctors);
    }
  }, [searchData, value, patientsData]);

  const handleSearch = (event: React.ChangeEvent<any>) => {
    setSearchData(event.target.value);
  };

  return (
    <div>
      <Typography color="primary" variant="h4" align="center">Pacientes</Typography>
      <Paper className={classes.paper}>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Nombre del paciente"
            variant="outlined"
            value={searchData}
            onChange={handleSearch}
          />
          <FormControl className={classes.frm}>
            <FormLabel component="legend">Psicología</FormLabel>
            {fields.map((r) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={r.id}>
                <FormControlLabel value={r.name} control={<Radio />} label={r.name} />
              </RadioGroup>
            ))}
          </FormControl>
          <FormControl className={classes.frm}>
            <FormLabel component="legend">Psiquiatría</FormLabel>
            {fieldsPs.map((r) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={r.id}>
                <FormControlLabel value={r.name} control={<Radio />} label={r.name} />
              </RadioGroup>
            ))}
          </FormControl>
          <FormControl className={classes.frm}>
            <FormLabel component="legend">Clínica</FormLabel>
            {fieldsCl.map((r) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={r.id}>
                <FormControlLabel value={r.name} control={<Radio />} label={r.name} />
              </RadioGroup>
            ))}
          </FormControl>
          <FormControl className={classes.frm}>
            <FormLabel component="legend">Asesoría</FormLabel>
            {fieldsAs.map((r) => (
              <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange} key={r.id}>
                <FormControlLabel value={r.name} control={<Radio />} label={r.name} />
              </RadioGroup>
            ))}
          </FormControl>
        </Grid>
        <GridList className={classes.gridList}>
          <Grid item xs={8}>
            <Table className={classes.table}>
              <TableBody>
                {patients.map((r) => (
                  <StyledTableRow key={r.id}>
                    <StyledTableCell align="left" color="textPrimary">
                      <Link to={`/expediente/${r.recordId}`}>
                        {r.name}
                        {' '}
                        {r.lastName}
                      </Link>

                      <>
                        <Typography color="textSecondary" variant="subtitle2">
                          {r.type}
                        </Typography>
                      </>
                      <>
                        <Typography color="textSecondary" variant="subtitle2">
                          Expediente:
                          {' '}
                          {r.recordId}
                        </Typography>
                      </>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </GridList>
      </Paper>
    </div>

  );
}
