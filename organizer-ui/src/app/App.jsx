import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { ActivityGroups, ActivityInputDialog } from '../features/activities';

export default function App() {
  const [isActivityDialogOpened, setIsActivityDialogOpened] = useState(false);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setIsActivityDialogOpened(true)}>
        Add activity
      </Button>
      <ActivityInputDialog
        title="New activity"
        isOpened={isActivityDialogOpened}
        onClose={() => setIsActivityDialogOpened(false)}
      ></ActivityInputDialog>
      <ActivityGroups></ActivityGroups>
    </Box>
  );
}
