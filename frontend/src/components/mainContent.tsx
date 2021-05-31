import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import FadeIn from 'react-fade-in';

interface MainContentSingle {
  children: JSX.Element;
}

interface MainContentChildren {
  children: JSX.Element[];
}

type MainContentProps = MainContentSingle | MainContentChildren;

function MainContent(props: MainContentProps) {
  const { children } = props;
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 12),
    },
  }));
  const classes = useStyles();

  return (
    <FadeIn>
      <main className={classes.heroContent}>
        <Container>
          { children }
        </Container>
      </main>
    </FadeIn>
  );
}

export default MainContent;
