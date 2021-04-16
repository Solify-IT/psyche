import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
}
  from '@material-ui/core';
import data from './data';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
}));

// interface CompleteField {
//   label: string;
//   type: string;
//   name: string;
//   value: string;
// }

function GenerateForm() {
  const classes = useStyles();
  const [fields, setFields] = useState(data);

  function addField(field:any) {
    if (field.name === 'dfsfs') {
      setFields((prevFields) => [...prevFields, field]);
    }
  }

  useEffect(() => {
    data.map(addField);
  }, []);

  function createComponent(field:any) {
    return (
      <div>
        <p>{field.label}</p>
        <p>{field.type}</p>
        <p>{field.name}</p>
        <p>{field.value}</p>
      </div>
    );
  }

  return (
    <main>
      <div className={classes.heroContent}>
        <Typography variant="h2" align="center">
          Visualizar Form
        </Typography>
        <Container>
          <Grid container>
            {fields.map(createComponent)}
          </Grid>
        </Container>
      </div>
    </main>
  );
}

export default GenerateForm;
