import { Grid } from '@mui/material';

function AppBody() {
  return (
    <Grid container sx={{ pt: 8 }}>
      <Grid item sm={3}>
        <h1>Hello</h1>
      </Grid>
      <Grid item sm={9}>
        <h1>Hello</h1>
      </Grid>
    </Grid>
  );
}

export default AppBody;
