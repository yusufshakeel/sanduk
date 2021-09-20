import React, { useState } from 'react';
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';
import { Button, FormControl, Grid, TextField, Typography, Alert, AlertTitle } from '@mui/material';
const electron = window.require('electron');
const { clipboard } = electron;

function ToolUUID() {
  const [generatedUUIDV4, setGeneratedUUIDV4] = useState('');
  const [generatedUUIDV5, setGeneratedUUIDV5] = useState('');
  const [uuidV5String, setUuidV5String] = useState('');
  const [uuidV5Namespace, setUuidV5Namespace] = useState('');
  const [uuidV5Message, setUuidV5Message] = useState(<React.Fragment />);

  const handleClearUUIDV5Fields = () => {
    setGeneratedUUIDV5('');
    setUuidV5String('');
    setUuidV5Namespace('');
    setUuidV5Message('');
  };

  const handleUUIDV5 = () => {
    setUuidV5Message('');
    if (!uuidV5Namespace.trim().length) {
      setUuidV5Message(
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Namespace</strong> is required.
        </Alert>
      );
    } else {
      try {
        setGeneratedUUIDV5(uuidV5(uuidV5String, uuidV5Namespace));
      } catch (err) {
        setUuidV5Message(
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            {err.message} | {err.stack}
          </Alert>
        );
      }
    }
  };

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
            value={generatedUUIDV4}
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
            onClick={() => setGeneratedUUIDV4(uuidV4())}
          >
            Generate
          </Button>
          <Button
            id="copyUUIDv4Btn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
            onClick={() => clipboard.writeText(generatedUUIDV4)}
          >
            Copy
          </Button>
          <Button
            id="clearUUIDv4Btn"
            variant="text"
            color="info"
            size="large"
            onClick={() => setGeneratedUUIDV4('')}
          >
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
            value={uuidV5String}
            onChange={e => setUuidV5String(e.target.value)}
            inputProps={{
              style: { fontSize: '1.5em', fontFamily: 'monospace' }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="uuidV5Namespace"
            label="Namespace"
            value={uuidV5Namespace}
            onChange={e => setUuidV5Namespace(e.target.value)}
            inputProps={{
              style: { fontSize: '1.5em', fontFamily: 'monospace' }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="uuidV5Output"
            label="UUID v5"
            value={generatedUUIDV5}
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
            onClick={handleUUIDV5}
          >
            Generate
          </Button>
          <Button
            id="copyUUIDv4Btn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
            onClick={() => generatedUUIDV5.length && clipboard.writeText(generatedUUIDV5)}
          >
            Copy
          </Button>
          <Button
            id="clearUUIDv4Btn"
            variant="text"
            color="info"
            size="large"
            onClick={handleClearUUIDV5Fields}
          >
            Clear
          </Button>
        </div>
        <div id="uuidV5MessageContainer">{uuidV5Message}</div>
      </Grid>
    </Grid>
  );
}

export default ToolUUID;
