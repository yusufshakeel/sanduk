import React, { useState, useEffect, useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-searchbox';
import jwtDecode from 'jwt-decode';
import { Button, Grid, Typography } from '@mui/material';
import DisappearingComponent from '../helpers/DisappearingComponent';
import AlertError from '../helpers/AlertError';
import AppContext from '../../store/app-context';

function ToolJWTDecoder() {
  const ctx = useContext(AppContext);
  const { isDarkModeEnabled } = ctx;

  const [editorTheme, setEditorTheme] = useState('monokai');

  const [jwtInput, setJwtInput] = useState('');
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');

  const [message, setMessage] = useState(<React.Fragment />);

  useEffect(() => {
    const editorTheme = isDarkModeEnabled ? 'monokai' : 'github';
    setEditorTheme(editorTheme);
  }, [isDarkModeEnabled]);

  const handleDecodeJwt = () => {
    try {
      setMessage('');

      const input = jwtInput.trim();
      if (!input.length) {
        return;
      }

      const decodedHeader = jwtDecode(input, { header: true });
      const decodedJWT = jwtDecode(input);

      setJwtHeader(JSON.stringify(decodedHeader, null, 2));
      setJwtPayload(JSON.stringify(decodedJWT, null, 2));
    } catch (e) {
      setMessage(
        <DisappearingComponent>
          <AlertError>{e.message}</AlertError>
        </DisappearingComponent>
      );
    }
  };

  const clearJwtInputFields = () => {
    setJwtInput('');
    setJwtHeader('');
    setJwtPayload('');
    setMessage('');
  };

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
        <div id="jwtEditorContainer">
          <AceEditor
            mode="text"
            theme={editorTheme}
            value={jwtInput}
            onChange={e => setJwtInput(e)}
            wrapEnabled={true}
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
          <Button
            id="decodeBtn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
            onClick={handleDecodeJwt}
          >
            Decode
          </Button>
          <Button
            id="clearBtn"
            variant="text"
            color="info"
            size="large"
            onClick={clearJwtInputFields}
          >
            Clear
          </Button>
        </div>
        <div id="messageContainer">{message}</div>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Header
        </Typography>
        <div id="jwtHeaderEditorContainer">
          <AceEditor
            mode="json5"
            theme={editorTheme}
            value={jwtHeader}
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
        <div id="jwtPayloadEditorContainer">
          <AceEditor
            mode="json5"
            theme={editorTheme}
            value={jwtPayload}
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
