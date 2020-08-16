import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow, TableCell, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getActivities } from '../activities.actions';
import ActivityInputDialog from './ActivityInputDialog';
import ActivityDeleteDialog from './ActivityDeleteDialog';

function ActivitiesList({ date, activities, getActivities }) {
  const [editDialogOptions, setEditDialogOptions] = useState({
    isOpened: false,
    activity: null,
  });
  const [deleteDialogOptions, setDeleteDialogOptions] = useState({
    isOpened: false,
    activity: null,
  });

  useEffect(() => {
    getActivities({ date });
  }, [date, getActivities]);

  return (
    <Table>
      <TableBody>
        {activities.map(a => (
          <TableRow key={a._id}>
            <TableCell width="80%">{a.title}</TableCell>
            <TableCell>
              <Tooltip title="Edit activity">
                <IconButton
                  onClick={() =>
                    setEditDialogOptions({
                      isOpened: true,
                      activity: a,
                    })
                  }
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Delete activity">
                <IconButton
                  onClick={() =>
                    setDeleteDialogOptions({
                      isOpened: true,
                      activity: a,
                    })
                  }
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ActivityInputDialog
        title="Edit activity"
        isOpened={editDialogOptions.isOpened}
        onClose={() => setEditDialogOptions({ isOpened: false })}
        activity={editDialogOptions.activity}
      ></ActivityInputDialog>
      <ActivityDeleteDialog
        isOpened={deleteDialogOptions.isOpened}
        activity={deleteDialogOptions.activity}
        onClose={() => setDeleteDialogOptions({ isOpened: false })}
      ></ActivityDeleteDialog>
    </Table>
  );
}

ActivitiesList.propTypes = {
  date: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getActivities: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    activities: state.activities,
  }),
  dispatch => ({
    getActivities: filterParams => dispatch(getActivities(filterParams)),
  }),
)(ActivitiesList);
