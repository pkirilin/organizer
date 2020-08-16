import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, Button, CardHeader } from '@material-ui/core';
import ActivitiesListDialog from './ActivitiesListDialog';

function ActivityGroupItem({ group }) {
  const [isActivitiesListOpened, setIsActivitiesListOpened] = useState(false);

  return (
    <Card>
      <CardHeader title={group.date} subheader={`Activities planned: ${group.count}`}></CardHeader>
      <CardActions>
        <Button size="small" onClick={() => setIsActivitiesListOpened(true)}>
          Show
        </Button>
      </CardActions>
      <ActivitiesListDialog
        isOpened={isActivitiesListOpened}
        onClose={() => setIsActivitiesListOpened(false)}
        activityDate={group.date}
      ></ActivitiesListDialog>
    </Card>
  );
}

ActivityGroupItem.propTypes = {
  group: PropTypes.shape({
    date: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActivityGroupItem;
