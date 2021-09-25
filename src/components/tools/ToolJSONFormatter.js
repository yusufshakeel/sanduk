import React, { useState, useRef, useContext, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/mode-json5';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/theme-github';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import { Grid, Typography, ButtonGroup, Button, Tooltip } from '@mui/material';
import {
  Spellcheck as SpellcheckIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  WrapText as WrapTextIcon,
  Expand as ExpandIcon,
  Compress as CompressIcon,
  ExpandLess as ExpandLessIcon,
  TextFormat as TextFormatIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import DisappearingComponent from '../helpers/DisappearingComponent';
import AlertError from '../helpers/AlertError';
import AlertSuccess from '../helpers/AlertSuccess';
import EditorStatusBar from '../helpers/EditorStatusBar';
import AppContext from '../../store/app-context';

function ToolJSONFormatter() {
  const editor = useRef(null);
  const ctx = useContext(AppContext);
  const { isDarkModeEnabled } = ctx;

  const [editorTheme, setEditorTheme] = useState('monokai');
  const [fontSize, setFontSize] = useState(16);
  const [jsonInput, setJsonInput] = useState('');
  const [isWrapEnabled, setWrapEnabled] = useState(false);
  const [lineNumber, setLineNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(1);
  const [tabSize] = useState(2);
  const [message, setMessage] = useState(<React.Fragment />);

  useEffect(() => {
    const editorTheme = isDarkModeEnabled ? 'monokai' : 'github';
    setEditorTheme(editorTheme);
  }, [isDarkModeEnabled]);

  const showErrorMessage = message => {
    setMessage(
      <DisappearingComponent>
        <AlertError>{message}</AlertError>
      </DisappearingComponent>
    );
  };

  const showSuccessMessage = message => {
    setMessage(
      <DisappearingComponent>
        <AlertSuccess>{message}</AlertSuccess>
      </DisappearingComponent>
    );
  };

  const isValidJSON = () => {
    try {
      JSON.parse(jsonInput);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleValidation = () => {
    if (isValidJSON()) {
      showSuccessMessage('Valid JSON');
    } else {
      showErrorMessage('Invalid JSON');
    }
  };

  const handleCompressJSON = () => {
    try {
      setMessage('');
      if (!jsonInput.length) {
        return;
      }
      const json = JSON.stringify(JSON.parse(jsonInput));
      setJsonInput(json);
    } catch (e) {
      showErrorMessage(e.message);
    }
  };

  const handleExpandJSON = () => {
    editor.current.editor.session.unfold(null);
    try {
      setMessage('');
      if (!jsonInput.length) {
        return;
      }
      const json = JSON.stringify(JSON.parse(jsonInput), null, tabSize);
      setJsonInput(json);
    } catch (e) {
      showErrorMessage(e.message);
    }
  };

  const handleFold = () => {
    editor.current.editor.session.foldAll(1);
  };

  const handleZoomIn = () => {
    if (fontSize < 48) {
      setFontSize(fontSize + 1);
    }
  };

  const handleZoomOut = () => {
    if (fontSize > 8) {
      setFontSize(fontSize - 1);
    }
  };

  const handleResetFontSize = () => {
    setFontSize(16);
  };

  const handleClear = () => {
    setJsonInput('');
  };

  const handleCursorChange = () => {
    const { row = 0, column = 0 } = editor.current.editor.getCursorPosition();
    setLineNumber(row + 1);
    setColumnNumber(column + 1);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          JSON Formatter
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }} textAlign="center">
        <ButtonGroup variant="outlined">
          <Tooltip title="Validate">
            <Button
              onClick={() => {
                jsonInput.length && handleValidation();
              }}
            >
              <SpellcheckIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Compress">
            <Button onClick={handleCompressJSON}>
              <CompressIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Expand">
            <Button onClick={handleExpandJSON}>
              <ExpandIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Fold">
            <Button onClick={handleFold}>
              <ExpandLessIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Wrap">
            <Button onClick={() => setWrapEnabled(!isWrapEnabled)}>
              <WrapTextIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Zoom In">
            <Button onClick={handleZoomIn}>
              <ZoomInIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Reset Zoom">
            <Button onClick={handleResetFontSize}>
              <TextFormatIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <Button onClick={handleZoomOut}>
              <ZoomOutIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Clear">
            <Button onClick={handleClear}>
              <DeleteIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <div id="jsonFormatterEditorContainer">
          <AceEditor
            ref={editor}
            mode="json5"
            theme={editorTheme}
            fontSize={fontSize}
            value={jsonInput}
            wrapEnabled={isWrapEnabled}
            onChange={e => setJsonInput(e)}
            onCursorChange={handleCursorChange}
            style={{ width: '100%', height: '70vh' }}
            setOptions={{
              tabSize: tabSize,
              useSoftTabs: true,
              showPrintMargin: false
            }}
          />
          <EditorStatusBar
            fontSize={fontSize}
            line={lineNumber}
            column={columnNumber}
            tabSize={tabSize}
          />
        </div>
        <div id="messageContainer">{message}</div>
      </Grid>
    </Grid>
  );
}

export default ToolJSONFormatter;
