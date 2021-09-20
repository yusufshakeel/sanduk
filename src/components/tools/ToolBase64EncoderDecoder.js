import { Typography, Grid, TextField, FormControl, Button } from '@mui/material';

function ToolBase64EncoderDecoder() {
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
          <TextField id="encodeInput" label="Plain Text" multiline rows={6} />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            id="encodeInputBtn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Encode
          </Button>
          <Button
            id="copyEncodeOutputBtn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            Copy
          </Button>
          <Button id="clearEncodeBtn" variant="text" color="info" size="large">
            Clear
          </Button>
        </div>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField id="encodeOutput" label="Base64 Encoded" multiline rows={6} />
        </FormControl>
        <div id="encodeMessageContainer" />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          Decode
        </Typography>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField id="decodeInput" label="Base64 Encoded" multiline rows={6} />
        </FormControl>
        <div style={{ marginBottom: '40px' }}>
          <Button
            id="decodeInputBtn"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Decode
          </Button>
          <Button
            id="copyDecodeOutputBtn"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            Copy
          </Button>
          <Button id="clearDecodeBtn" variant="text" color="info" size="large">
            Clear
          </Button>
        </div>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField id="decodeOutput" label="Plain Text" multiline rows={6} />
        </FormControl>
        <div id="decodeMessageContainer" />
      </Grid>
    </Grid>
  );
}

export default ToolBase64EncoderDecoder;
