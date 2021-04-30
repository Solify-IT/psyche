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
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: FilmOptionType) => option.name,
});
interface FilmOptionType {
  name: string;
}

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
  const [searchData, setSearchData] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [doctor, setDoctor] = useState<any[]>([]);
  const [patientsData, setPatientsData] = useState<any[]>([]);
  const [doctorData, setDoctorData] = useState<any[]>([]);
  const getPatients = async () => {
    try {
      const response = await fetch('http://localhost:8000/patients');
      const jsonData = await response.json();
      console.log(jsonData);
      setPatients(jsonData);
      setPatientsData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8000/doctors');
      const jsonData = await response.json();
      console.log(jsonData);
      setDoctor(jsonData);
      setDoctorData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const [value, setValue] = useState('Adulto');
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    getDoctors();
    getPatients();
  });

  useEffect(() => {
    const patientFilter = Object.values(patientsData);
    const doctorFilter = Object.values(doctorData);
    console.log(value);
    const filteredUsers = patientFilter.filter(
      (patientConverter) => (patientConverter.name.toLowerCase()
        .includes(searchData.toLowerCase())
       && patientConverter.type.toLowerCase() === value.toLowerCase())
       || (patientConverter.name.toLowerCase()
         .includes(searchData.toLowerCase())
      && patientConverter.area.toLowerCase() === value.toLowerCase())
      || (patientConverter.type.toLowerCase() === value.toLowerCase()
      && patientConverter.area.toLowerCase() === value.toLowerCase())
      || ((patientConverter.name.toLowerCase()
        .includes(searchData.toLowerCase())
      && patientConverter.type.toLowerCase() === value.toLowerCase()
      && patientConverter.area.toLowerCase() === value.toLowerCase())),
    );
    const filteredDoctors = doctorFilter.filter(
      (doctorConverter) => (doctorConverter.name.toLowerCase()
        .includes(searchData.toLowerCase())
      ),
    );
    setPatients(patients);
    setPatients(filteredUsers);
    setDoctor(filteredDoctors);
  }, [searchData, value, patientsData, doctorData]);

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
          <FormControl component="fieldset" className={classes.frm}>
            <FormLabel component="legend">Área</FormLabel>
            <RadioGroup aria-label="area" name="area" value={value} onChange={handleChange}>
              <FormControlLabel value="Psicología" control={<Radio />} label="Psicología" />
              <FormControlLabel value="Psiquiatría" control={<Radio />} label="Psiquiatría" />
              <FormControlLabel value="Área jurídica" control={<Radio />} label="Área jurídica" />
            </RadioGroup>
          </FormControl>
          <Autocomplete
            id="filter-demo"
            options={doctor}
            getOptionLabel={(option) => option.name}
            filterOptions={filterOptions}
            style={{ width: 220 }}
            /* eslint-disable react/jsx-props-no-spreading */
            renderInput={(params) => <TextField {...params} label="Nombre del doctor" variant="outlined" />}
          />
          <FormControl className={classes.frm}>
            <FormLabel component="legend">Tipo</FormLabel>
            <RadioGroup aria-label="type" name="type" value={value} onChange={handleChange}>
              <FormControlLabel value="Adulto" control={<Radio />} label="Adulto" />
              <FormControlLabel value="Menor" control={<Radio />} label="Menor" />
              <FormControlLabel value="Pareja" control={<Radio />} label="Pareja" />
            </RadioGroup>
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
                      </Link>

                      <>
                        <Typography color="textSecondary" variant="subtitle2">
                          {r.type}
                        </Typography>
                      </>
                      <>
                        <Typography color="textSecondary" variant="subtitle2">
                          Folio:
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
