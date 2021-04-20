import React, { useEffect, useState } from 'react';
import {
  withStyles, Theme, createStyles, makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
    minWidth: 500,
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
}));

export default function CustomizedTables() {
  const [patient, setPatient] = useState<any[]>([]);
  const getPatients = async () => {
    try {
      const response = await fetch('http://localhost:8000/patients');
      const jsonData = await response.json();

      setPatient(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getPatients();
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Nombre del paciente"
              variant="outlined"
            />
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography color="primary" variant="h4" align="center">Pacientes</Typography>
            <Table className={classes.table}>
              <TableBody>
                {patient.map((r) => (
                  <StyledTableRow key={r.name}>
                    <StyledTableCell align="left" color="textPrimary">
                      {r.name}
                      <>
                        <Typography color="textSecondary" variant="subtitle2">
                          {r.doctor}
                        </Typography>
                      </>
                      <>
                        <Typography color="textSecondary" variant="subtitle2">
                          Folio:
                          {' '}
                          {r.id}
                        </Typography>
                      </>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
