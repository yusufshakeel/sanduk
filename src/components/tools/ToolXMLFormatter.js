import { Button, ButtonGroup, Grid, Tooltip, Typography } from '@mui/material';
import xmlFormatter from 'xml-formatter';
import {
  Compress as CompressIcon,
  Delete as DeleteIcon,
  Expand as ExpandIcon,
  WrapText as WrapTextIcon,
  TextFormat as TextFormatIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/mode-xml';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/theme-github';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import EditorStatusBar from '../helpers/EditorStatusBar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../store/app-context';
import DisappearingComponent from '../helpers/DisappearingComponent';
import AlertError from '../helpers/AlertError';

function ToolXMLFormatter() {
  const editor = useRef(null);
  const ctx = useContext(AppContext);
  const { isDarkModeEnabled } = ctx;

  const [editorTheme, setEditorTheme] = useState('monokai');
  const [fontSize, setFontSize] = useState(16);
  const [xmlInput, setXmlInput] = useState('');
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

  const handleCompress = () => {
    try {
      setMessage('');
      if (!xmlInput.length) {
        return;
      }
      const xml = xmlFormatter(xmlInput, { indentation: '', lineSeparator: '' });
      setXmlInput(xml);
    } catch (e) {
      showErrorMessage(e.message);
    }
  };

  const handleExpand = () => {
    editor.current.editor.session.unfold(null);
    try {
      setMessage('');
      if (!xmlInput.length) {
        return;
      }
      const xml = xmlFormatter(xmlInput, { indentation: '  ' });
      setXmlInput(xml);
    } catch (e) {
      showErrorMessage(e.message);
    }
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
    setXmlInput('');
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
          XML Formatter
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }} textAlign="center">
        <ButtonGroup variant="outlined">
          <Tooltip title="Compress">
            <Button onClick={handleCompress}>
              <CompressIcon sx={{ fontSize: '1.5em' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Expand">
            <Button onClick={handleExpand}>
              <ExpandIcon sx={{ fontSize: '1.5em' }} />
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
            mode="xml"
            theme={editorTheme}
            fontSize={fontSize}
            value={xmlInput}
            wrapEnabled={isWrapEnabled}
            onChange={e => setXmlInput(e)}
            onCursorChange={handleCursorChange}
            style={{ width: '100%', height: '70vh' }}
            setOptions={{
              tabSize: tabSize,
              useSoftTabs: true,
              showPrintMargin: false
            }}
          />
          <EditorStatusBar fontSize={fontSize} line={lineNumber} column={columnNumber} />
        </div>
        <div id="messageContainer">{message}</div>
      </Grid>
    </Grid>
  );
}

export default ToolXMLFormatter;
