import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivityItems } from '../../actions';
import PropTypes from 'prop-types';
import Activity from '../Activity';

function Activities({ activities, getActivityItems }) {
  useEffect(() => {
    getActivityItems();
  }, [getActivityItems]);

  if (!activities || (activities && activities.length === 0)) {
    return <div>No activities planned</div>;
  }

  return activities.map(a => <Activity key={a._id} activity={a}></Activity>);
}

Activities.propTypes = {
  activityItems: PropTypes.array,
  getActivityItems: PropTypes.func,
};

export default connect(
  state => ({
    activities: state.activities,
  }),
  dispatch => ({
    getActivityItems: () => dispatch(getActivityItems()),
  }),
)(Activities);
