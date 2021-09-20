import {
  Button,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

function ToolEpoch() {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          Epoch
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField id="epochInput" label="Enter epoch time" />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="epochTimeInUtc"
            label="Time in UTC"
            disabled
            defaultValue={new Date().toUTCString()}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="epochTimeInLocale"
            label="Time in locale"
            disabled
            defaultValue={new Date().toLocaleString()}
          />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button id="computeBtn" variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
            Compute
          </Button>
          <Button id="clearBtn" variant="text" color="info" size="large">
            Clear
          </Button>
        </div>
        <div id="messageContainer" />
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Current
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right">Locale</TableCell>
                <TableCell colSpan={2}>Mon Sep 20 2021 09:39:21</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">UTC/GMT</TableCell>
                <TableCell colSpan={2}>{new Date().toUTCString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Epoch</TableCell>
                <TableCell>
                  <span data-current-epoch={1632110937}>1632110937</span>
                </TableCell>
                <TableCell>
                  <Button id="copyCurrentEpochBtn" variant="outlined" color="secondary">
                    Copy
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default ToolEpoch;
