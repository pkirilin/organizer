import 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { connect } from 'react-redux';
import {
  createActivity,
  getActivityGroups,
  updateActivity,
  getActivities,
} from '../activities.actions';
import { CREATE_ACTIVITY_SUCCESS, UPDATE_ACTIVITY_SUCCESS } from '../activities.constants';

export function ActivityInputDialog({
  title: dialogTitle,
  isOpened = false,
  onClose,
  activity,
  createActivity,
  updateActivity,
  getActivityGroups,
  getActivities,
}) {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(true);

  const validateTitle = () => {
    return title.length >= 4;
  };

  const validateTitleMemo = useCallback(validateTitle, [title]);

  useEffect(() => {
    if (!isValidTitle && validateTitleMemo()) {
      setIsValidTitle(true);
    }
  }, [isValidTitle, title, validateTitleMemo]);

  useEffect(() => {
    if (activity) {
      setDate(activity.date);
      setTitle(activity.title);
    }
  }, [activity]);

  if (!isOpened) {
    return null;
  }

  const handleCreateActivity = async () => {
    if (!validateTitle()) {
      setIsValidTitle(false);
      return;
    }

    setIsValidTitle(true);

    const { type } = await createActivity({
      date,
      title,
    });

    if (type === CREATE_ACTIVITY_SUCCESS) {
      onClose();
      setTitle('');
      await getActivityGroups();
    }
  };

  const handleUpdateActivity = async () => {
    if (!validateTitle()) {
      setIsValidTitle(false);
      return;
    }

    setIsValidTitle(true);

    const { type } = await updateActivity(activity._id, {
      date,
      title,
    });

    if (type === UPDATE_ACTIVITY_SUCCESS) {
      onClose();
      setTitle('');
      await getActivities({ date: activity.date });
    }
  };

  return (
    <Dialog open={isOpened} onClose={onClose} fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                format="dd/MM/yyyy"
                margin="normal"
                label="Date"
                value={date}
                onChange={newDate => setDate(newDate)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <TextField
              error={!isValidTitle}
              helperText={!isValidTitle ? 'Activity title is too short' : ''}
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={activity ? handleUpdateActivity : handleCreateActivity}
        >
          {activity ? 'Save' : 'Create'}
        </Button>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ActivityInputDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
  createActivity: PropTypes.func,
  updateActivity: PropTypes.func,
  getActivityGroups: PropTypes.func,
  getActivities: PropTypes.func,
};

export default connect(null, dispatch => ({
  createActivity: activity => dispatch(createActivity(activity)),
  updateActivity: (activityId, activity) => dispatch(updateActivity(activityId, activity)),
  getActivityGroups: () => dispatch(getActivityGroups()),
  getActivities: filterParams => dispatch(getActivities(filterParams)),
}))(ActivityInputDialog);
