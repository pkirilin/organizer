import React, { useState } from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import { ActivityGroups, ActivityInputDialog } from '../features/activities';

export default function App() {
  const [isActivityDialogOpened, setIsActivityDialogOpened] = useState(false);

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsActivityDialogOpened(true)}
          >
            Add activity
          </Button>
        </Grid>
        <Grid item>
          <ActivityInputDialog
            title="New activity"
            isOpened={isActivityDialogOpened}
            onClose={() => setIsActivityDialogOpened(false)}
          ></ActivityInputDialog>
          <ActivityGroups></ActivityGroups>
        </Grid>
      </Grid>
    </Container>
  );
}
