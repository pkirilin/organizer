import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivityGroups } from '../activities.actions';
import PropTypes from 'prop-types';
import ActivityGroupItem from './ActivityGroupItem';
import { Grid } from '@material-ui/core';

function ActivityGroups({ groups, getActivityGroups }) {
  useEffect(() => {
    getActivityGroups();
  }, [getActivityGroups]);

  if (!groups || (groups && groups.length === 0)) {
    return <div>No activities planned</div>;
  }

  return (
    <Grid container spacing={1}>
      {groups.map(g => (
        <Grid item xs={3} key={g.date}>
          <ActivityGroupItem group={g}></ActivityGroupItem>
        </Grid>
      ))}
    </Grid>
  );
}

ActivityGroups.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  getActivityGroups: PropTypes.func,
};

export default connect(
  state => ({
    groups: state.activityGroups,
  }),
  dispatch => ({
    getActivityGroups: () => dispatch(getActivityGroups()),
  }),
)(ActivityGroups);
