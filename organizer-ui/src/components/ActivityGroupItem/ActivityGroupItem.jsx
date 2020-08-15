import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, Button, CardHeader } from '@material-ui/core';

function ActivityGroupItem({ group }) {
  return (
    <Card>
      <CardHeader title={group.date} subheader={`Activities planned: ${group.count}`}></CardHeader>
      <CardActions>
        <Button size="small">Show</Button>
      </CardActions>
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
