import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

function Activity({ activity }) {
  return (
    <Grid container direction="column">
      <span>{activity.date}</span>
      <span>{activity.title}</span>
    </Grid>
  );
}

Activity.propTypes = {
  activity: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Activity;
