import React from 'react';
import { PropTypes, Typography } from '@material-ui/core';

type TitleProps = {
  text: string;
  align?: PropTypes.Alignment;
};

function ContentTitle(props: TitleProps) {
  const { text, align } = props;
  return (
    <Typography variant="h2" align={align} color="primary" gutterBottom>
      { text }
    </Typography>
  );
}
ContentTitle.defaultProps = {
  align: 'center',
};

export default ContentTitle;
