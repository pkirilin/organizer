import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import Activities from './components/Activities';
import ActivityInputDialog from './components/ActivityInputDialog';

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
      <Activities></Activities>
    </Box>
  );
}
