import 'date-fns';
import React, { useState } from 'react';
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

function ActivityInputDialog({ title: dialogTitle, isOpened = false, onClose }) {
  const [date, setDate] = useState();
  const [title, setTitle] = useState('');

  if (!isOpened) {
    return null;
  }

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
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

ActivityInputDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ActivityInputDialog;
