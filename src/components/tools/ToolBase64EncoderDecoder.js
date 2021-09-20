import React, { useState } from 'react';
import base64 from 'base-64';
import utf8 from 'utf8';
import { Typography, Grid, TextField, FormControl, Button, AlertTitle, Alert } from '@mui/material';
const electron = window.require('electron');
const { clipboard } = electron;

function ToolBase64EncoderDecoder() {
  const [encodeInput, setEncodeInput] = useState('');
  const [encodeResult, setEncodeResult] = useState('');
  const [encodeMessage, setEncodeMessage] = useState(<React.Fragment />);

  const [decodeInput, setDecodeInput] = useState('');
  const [decodeResult, setDecodeResult] = useState('');
  const [decodeMessage, setDecodeMessage] = useState(<React.Fragment />);

  const handleEncode = () => {
    setEncodeMessage('');
    setEncodeResult('');

    if (!encodeInput.length) {
      setEncodeMessage(
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Plain Text</strong> is required.
        </Alert>
      );
      return;
    }

    try {
      const input = encodeInput.trim();
      setEncodeResult(base64.encode(utf8.encode(input)));
    } catch (e) {
      setEncodeMessage(
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          {e.message}
        </Alert>
      );
    }
  };

  const clearEncodeFields = () => {
    setEncodeInput('');
    setEncodeResult('');
    setEncodeMessage('');
  };

  const handleDecode = () => {
    setDecodeMessage('');
    setDecodeResult('');

    if (!decodeInput.length) {
      setDecodeMessage(
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Encode Text</strong> is required.
        </Alert>
      );
      return;
    }

    try {
      const input = decodeInput.trim();
      setDecodeResult(utf8.decode(base64.decode(input)));
    } catch (e) {
      setDecodeMessage(
        <Alert variant="filled" severity="error">
          <AlertTitle>Error</AlertTitle>
          {e.message}
        </Alert>
      );
    }
  };

  const clearDecodeFields = () => {
    setDecodeInput('');
    setDecodeResult('');
    setDecodeMessage('');
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          Base64 Encoder Decoder
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          Encode
        </Typography>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="encodeInput"
            label="Plain Text"
            multiline
            rows={6}
            value={encodeInput}
            onChange={e => setEncodeInput(e.target.value)}
          />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            id="encodeInputBtn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
            onClick={handleEncode}
          >
            Encode
          </Button>
          <Button
            id="copyEncodeOutputBtn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
            onClick={() => encodeResult.length && clipboard.writeText(encodeResult)}
          >
            Copy
          </Button>
          <Button
            id="clearEncodeBtn"
            variant="text"
            color="info"
            size="large"
            onClick={clearEncodeFields}
          >
            Clear
          </Button>
        </div>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="encodeOutput"
            label="Base64 Encoded"
            multiline
            rows={6}
            value={encodeResult}
          />
        </FormControl>
        <div id="encodeMessageContainer">{encodeMessage}</div>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          Decode
        </Typography>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="decodeInput"
            label="Base64 Encoded"
            multiline
            rows={6}
            value={decodeInput}
            onChange={e => setDecodeInput(e.target.value)}
          />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            id="decodeInputBtn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
            onClick={handleDecode}
          >
            Decode
          </Button>
          <Button
            id="copyDecodeOutputBtn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
            onClick={() => decodeResult.length && clipboard.writeText(decodeResult)}
          >
            Copy
          </Button>
          <Button
            id="clearDecodeBtn"
            variant="text"
            color="info"
            size="large"
            onClick={clearDecodeFields}
          >
            Clear
          </Button>
        </div>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField id="decodeOutput" label="Plain Text" multiline rows={6} value={decodeResult} />
        </FormControl>
        <div id="decodeMessageContainer">{decodeMessage}</div>
      </Grid>
    </Grid>
  );
}

export default ToolBase64EncoderDecoder;
