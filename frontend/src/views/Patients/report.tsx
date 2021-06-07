/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import getReport from 'src/api/report';
import MainContent from 'src/components/mainContent';
import ContentTitle from 'src/components/contentTitle';
import Graph, { ChartData } from 'src/components/graph';
import {
  makeStyles, Typography, Grid, TextField, Button,
} from '@material-ui/core';
import LoadingSpinner from 'src/components/loadingSpinner';

export interface GraphGroup {
  title: string,
  graphs: IGraph[],
}

export interface IGraph {
  title: string,
  data: GraphData[],
  type: string,
  label?: string;
  groupByInterval?: boolean;
}

export interface GraphData {
  label: string,
  value: number,
}

type ReportResponse = {
  totalPatients: number,
  graphGroups: GraphGroup[],
};

function Report() {
  const originalEndDate : Date = new Date();
  const originalStartDate : Date = new Date(originalEndDate.getFullYear(), 0, 1);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [graphGroups, setGraphGroups] = useState<GraphGroup[]>([]);
  const [totalPatients, setTotalPatients] = useState<number>(0);
  const [dates, setDates] = useState({
    startDate: originalStartDate.toISOString().slice(0, 10),
    endDate: originalEndDate.toISOString().slice(0, 10),
  });

  useEffect(() => {
    setLoading(true);
    getReport(originalStartDate, originalEndDate)
      .then((response: ReportResponse) => {
        setGraphGroups(response.graphGroups);
        setTotalPatients(response.totalPatients);
        setLoading(false);
      })
      .catch((error:any) => console.log(error));
  }, []);

  const handleDateInterval = (event: React.ChangeEvent<any>) => {
    console.log(event.target.value);
    setDates({ ...dates, [event.target.name]: event.target.value });
    setLoading(true);
    getReport(new Date(dates.startDate), new Date(dates.endDate))
      .then((response: ReportResponse) => {
        setGraphGroups(response.graphGroups);
        setTotalPatients(response.totalPatients);
        setLoading(false);
      })
      .catch((error:any) => console.log(error));
  };

  const useStyles = makeStyles((theme) => ({
    graphGroupTitle: {
      marginBottom: 30,
    },
    graphGroup: {
      padding: theme.spacing(5, 5, 3, 5),
    },
    graph: {
      padding: theme.spacing(5, 1, 3, 1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      margin: '20px',
      padding: '30px',
    },
    submit: {
      marginLeft: '50px',
    },
    title: {
      marginLeft: '50px',
    },
  }));
  const classes = useStyles();
  const dynamicColors = () => {
    const r = Math.floor(Math.random() * (240 - 140)) + 140;
    const g = Math.floor(Math.random() * (240 - 140)) + 140;
    const b = Math.floor(Math.random() * (240 - 140)) + 140;
    const a = 0.9;
    return `rgb(${r},${g},${b},${a})`;
  };

  const interval: number = 2;

  function print() {
    window.print();
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <MainContent>
      <ContentTitle text="Estadísticas" />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.submit}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={print}
            >
              Imprimir
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="flex-end">
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              type="date"
              required
              fullWidth
              id="startDate"
              label="Fecha de inicio"
              name="startDate"
              value={dates.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateInterval}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              type="date"
              fullWidth
              id="startDate"
              label="Fecha de fin"
              name="endDate"
              value={dates.endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateInterval}
            />
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h6">
            Total de pacientes:
            {' '}
            {totalPatients}
          </Typography>
        </Grid>
        {graphGroups.map((group: GraphGroup) => (
          <Grid
            item
            xs={12}
            className={classes.paper}
            justify="center"
            alignItems="center"
          >
            <Typography variant="h4" style={{ fontWeight: 600 }} className={classes.graphGroupTitle}>{group.title}</Typography>
            <Grid xs={12} className={classes.graphGroup} justify="center" alignItems="center">
              { group.graphs.map((graph: IGraph) => {
                const labels = graph.data.map((data: GraphData) => data.label);
                const values = graph.data.map((data: GraphData) => data.value);
                const colors = graph.data.map(() => dynamicColors());

                const options = {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                      display: graph.label,
                    },
                    title: {
                      display: true,
                      text: graph.title,
                      font: {
                        size: 35,
                      },
                    },
                  },
                };
                if (graph.type === 'Bar' && graph.groupByInterval) {
                  const groupedData = [];
                  const groupedLabel = [];
                  let left = 0;
                  let right = interval;
                  const labelsNum : number[] = labels.map((label) => Number(label));
                  const max = Math.max(...labelsNum);
                  while (right < max) {
                    const currentLeft = left;
                    const currentRight = right;
                    const count = labelsNum.filter(
                      (value) => value >= currentLeft && value <= currentRight,
                    ).length;
                    groupedData.push(count);
                    groupedLabel.push(`${left} - ${right}`);
                    left += interval;
                    right += interval;
                  }
                  const graphData : ChartData = {
                    labels: groupedLabel,
                    datasets: [
                      {
                        label: graph.label,
                        data: groupedData,
                        backgroundColor: colors,
                        borderColor: colors,
                      },
                    ],
                  };
                  return (
                    <div className={classes.graph}>
                      <Graph type={graph.type} data={graphData} options={options} />
                    </div>
                  );
                }
                const graphData : ChartData = {
                  labels,
                  datasets: [
                    {
                      label: graph.label,
                      data: values,
                      backgroundColor: colors,
                      borderColor: colors,
                    },
                  ],
                };
                return (
                  <div className={classes.graph}>
                    <Graph type={graph.type} data={graphData} options={options} />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </div>
    </MainContent>
  );
}

export default Report;
