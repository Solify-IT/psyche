import React from 'react';
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

function createData(id: string, name: string, doctor: string) {
  return { id, name, doctor };
}
const rows = [
  createData('1', 'Marcela', 'Lalito'),
  createData('2', 'Daniela', 'Luci'),
  createData('3', 'Omar', 'Lalito'),
  createData('4', 'Jorge', 'Dani'),
  createData('5', 'Luci', 'Gus Gus'),
];

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '80%',
    marginTop: theme.spacing(3),
    marginLeft: '140px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
  paper: {
    maxWidth: 800,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid item xs={12} alignItems="center">
            <Typography color="primary" variant="h4" align="center">Pacientes</Typography>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} alignItems="center">
              <Table className={classes.table}>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell align="left" color="textPrimary">
                        {row.name}
                        <>
                          <Typography color="textSecondary" variant="subtitle2">
                            {row.doctor}
                          </Typography>
                        </>
                        <>
                          <Typography color="textSecondary" variant="subtitle2">
                            Folio:
                            {' '}
                            {row.id}
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
