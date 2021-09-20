import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-searchbox';
import { Button, Grid, Typography } from '@mui/material';

function ToolJWTDecoder() {
  function onChange(newValue) {
    // eslint-disable-next-line no-console
    console.log('change', newValue);
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          JSON Web Token Decoder
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          JWT
        </Typography>
        <div id="jwtEditorContainer" sx={{ mb: 5 }}>
          <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            name="jwtEditor"
            style={{ width: '100%', height: '200px', marginBottom: '40px' }}
            setOptions={{
              tabSize: 2,
              fontSize: 16,
              showPrintMargin: false
            }}
          />
        </div>
        <div style={{ marginBottom: '40px' }}>
          <Button id="decodeBtn" variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
            Decode
          </Button>
          <Button id="clearBtn" variant="text" color="info" size="large">
            Clear
          </Button>
        </div>
        <div id="messageContainer" />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Header
        </Typography>
        <div id="jwtHeaderEditorContainer" sx={{ mb: 5 }}>
          <AceEditor
            mode="java"
            theme="github"
            name="jwtHeaderEditor"
            style={{ width: '100%', height: '400px', marginBottom: '40px' }}
            setOptions={{
              tabSize: 2,
              fontSize: 16,
              showPrintMargin: false
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Payload
        </Typography>
        <div id="jwtPayloadEditorContainer" sx={{ mb: 5 }}>
          <AceEditor
            mode="java"
            theme="github"
            name="jwtPayloadEditor"
            style={{ width: '100%', height: '400px', marginBottom: '40px' }}
            setOptions={{
              tabSize: 2,
              fontSize: 16,
              showPrintMargin: false
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default ToolJWTDecoder;
