import React, { useState, useEffect, useRef } from 'react';
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
import DisappearingComponent from '../helpers/DisappearingComponent';
import AlertError from '../helpers/AlertError';
const electron = window.require('electron');
const { clipboard } = electron;

function ToolEpoch() {
  const timer = useRef(null);

  const [currentTimeLocale, setCurrentTimeLocale] = useState('');
  const [currentTimeUTC, setCurrentTimeUTC] = useState('');
  const [currentTimeEpoch, setCurrentTimeEpoch] = useState('');

  const [epochInput, setEpochInput] = useState('');
  const [epochInputInUTC, setEpochInputInUTC] = useState('');
  const [epochInputInLocale, setEpochInputInLocale] = useState('');

  const [message, setMessage] = useState(<React.Fragment />);

  const updateCurrentTime = () => {
    const date = new Date();
    setCurrentTimeLocale(date.toString().split('GMT')[0].trim());
    setCurrentTimeUTC(date.toUTCString());
    setCurrentTimeEpoch(`${parseInt(`${date.getTime() / 1000}`)}`);
  };

  useEffect(() => {
    // useRef value stored in .current property
    timer.current = setInterval(() => updateCurrentTime(), 1000);

    // clear on component unmount
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const clearEpochResult = () => {
    setEpochInput('');
    setEpochInputInUTC('');
    setEpochInputInLocale('');
    setMessage('');
  };

  const computeEpoch = () => {
    setMessage('');
    const epoch = Number(epochInput);
    if (!epochInput.length) {
      setMessage(
        <DisappearingComponent>
          <AlertError>Epoch is required.</AlertError>
        </DisappearingComponent>
      );
      return;
    }
    if (!Number.isInteger(epoch)) {
      setMessage(
        <DisappearingComponent>
          <AlertError>Epoch should be an integer value.</AlertError>
        </DisappearingComponent>
      );
      return;
    }

    const unixEpochTimeMS = epoch * 1000;
    const date = new Date(unixEpochTimeMS);
    const inLocal = date.toString().split('GMT')[0].trim();
    const inUTC = date.toUTCString();

    setEpochInputInUTC(inUTC);
    setEpochInputInLocale(inLocal);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 5 }}>
          Epoch
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="epochInput"
            label="Enter epoch time"
            value={epochInput}
            onChange={e => setEpochInput(e.target.value)}
            inputProps={{
              style: { fontSize: '1.5em' }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="epochTimeInUtc"
            label="Time in UTC"
            value={epochInputInUTC}
            inputProps={{
              style: { fontSize: '1.5em' }
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField
            id="epochTimeInLocale"
            label="Time in locale"
            value={epochInputInLocale}
            inputProps={{
              style: { fontSize: '1.5em' }
            }}
          />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
            onClick={computeEpoch}
          >
            Compute
          </Button>
          <Button variant="text" color="info" size="large" onClick={clearEpochResult}>
            Clear
          </Button>
        </div>
        <div id="messageContainer">{message}</div>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Current
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right">Locale</TableCell>
                <TableCell colSpan={2}>{currentTimeLocale}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">UTC/GMT</TableCell>
                <TableCell colSpan={2}>{currentTimeUTC}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Epoch</TableCell>
                <TableCell>{currentTimeEpoch}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => currentTimeEpoch.length && clipboard.writeText(currentTimeEpoch)}
                  >
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
