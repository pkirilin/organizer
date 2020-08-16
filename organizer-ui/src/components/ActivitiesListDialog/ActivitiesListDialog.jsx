import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import ActivitiesList from '../ActivitiesList';

function ActivitiesListDialog({ isOpened = false, onClose, activityDate }) {
  if (!isOpened) {
    return null;
  }

  return (
    <Dialog open={isOpened} onClose={onClose} fullWidth>
      <DialogTitle>Activities: {activityDate}</DialogTitle>
      <DialogContent>
        <ActivitiesList date={activityDate}></ActivitiesList>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

ActivitiesListDialog.propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  activityDate: PropTypes.string.isRequired,
};

export default ActivitiesListDialog;
