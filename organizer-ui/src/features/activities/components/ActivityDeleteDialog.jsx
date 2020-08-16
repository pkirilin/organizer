import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { deleteActivity, getActivities, getActivityGroups } from '../activities.actions';
import { DELETE_ACTIVITY_SUCCESS } from '../activities.constants';
import { connect } from 'react-redux';

function ActivityDeleteDialog({
  isOpened = false,
  activity = null,
  onClose,
  deleteActivity,
  getActivities,
  getActivityGroups,
}) {
  if (!isOpened) {
    return null;
  }

  const handleDeleteActivity = async () => {
    const { type } = await deleteActivity(activity._id);

    if (type === DELETE_ACTIVITY_SUCCESS) {
      onClose();
      await getActivities({ date: activity.date });
      await getActivityGroups();
    }
  };

  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle>Delete activity</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete activity &quot;{activity.title}
          &quot;?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteActivity}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}

ActivityDeleteDialog.propTypes = {
  isOpened: PropTypes.bool,
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
  deleteActivity: PropTypes.func.isRequired,
  getActivities: PropTypes.func.isRequired,
  getActivityGroups: PropTypes.func.isRequired,
};

export default connect(null, dispatch => ({
  getActivities: filterParams => dispatch(getActivities(filterParams)),
  getActivityGroups: () => dispatch(getActivityGroups()),
  deleteActivity: activityId => dispatch(deleteActivity(activityId)),
}))(ActivityDeleteDialog);
