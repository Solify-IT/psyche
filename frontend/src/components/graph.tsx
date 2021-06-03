import React from 'react';
import { Typography } from '@material-ui/core';
import { Pie, Bar } from 'react-chartjs-2';

export type Dataset = {
  label?: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[]
};

export type ChartData = {
  labels: string[];
  datasets: Dataset[];
};

export type ChartProps = {
  type: string;
  data: ChartData;
  options: any;
};

function Graph(props: ChartProps) {
  const {
    data, type, options,
  } = props;
  switch (type) {
    case 'Pie': {
      return <Pie type="" data={data} options={options} />;
    }
    case 'Bar': {
      return <Bar type="" data={data} options={options} />;
    }
    default: {
      return <Typography>No se pudo visualizar la gráfica</Typography>;
    }
  }
}
export default Graph;
