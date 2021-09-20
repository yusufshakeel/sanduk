import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';

function ToolUUID() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          UUID v4
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="uuidV4Output"
            label="UUID v4"
            disabled
            defaultValue="207e6776-9c36-4fa5-9e23-69c642778378"
            inputProps={{
              style: { fontSize: '1.5em', textAlign: 'center', fontFamily: 'monospace' }
            }}
          />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            id="generateUUIDv4Btn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Generate
          </Button>
          <Button
            id="copyUUIDv4Btn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            Copy
          </Button>
          <Button id="clearUUIDv4Btn" variant="text" color="info" size="large">
            Clear
          </Button>
        </div>
        <div id="uuidv4MessageContainer" />
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          UUID v5
        </Typography>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="uuidV5String"
            label="String"
            multiline
            rows={6}
            inputProps={{
              style: { fontSize: '1.5em', fontFamily: 'monospace' }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="uuidV5Namespace"
            label="Namespace"
            inputProps={{
              style: { fontSize: '1.5em', fontFamily: 'monospace' }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="uuidV5Output"
            label="UUID v5"
            disabled
            defaultValue="207e6776-9c36-4fa5-9e23-69c642778378"
            inputProps={{
              style: { fontSize: '1.5em', textAlign: 'center', fontFamily: 'monospace' }
            }}
          />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            id="generateUUIDv4Btn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Generate
          </Button>
          <Button
            id="copyUUIDv4Btn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            Copy
          </Button>
          <Button id="clearUUIDv4Btn" variant="text" color="info" size="large">
            Clear
          </Button>
        </div>
        <div id="uuidv5MessageContainer" />
      </Grid>
    </Grid>
  );
}

export default ToolUUID;
