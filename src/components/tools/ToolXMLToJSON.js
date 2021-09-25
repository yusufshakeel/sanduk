import React, { useContext, useEffect, useRef, useState } from 'react';
import xmlFormatter from 'xml-formatter';
import xmlToJson from 'xml-js';
import { Button, ButtonGroup, Grid, Tooltip, Typography } from '@mui/material';
import {
  Build as BuildIcon,
  Compress as CompressIcon,
  Delete as DeleteIcon,
  Expand as ExpandIcon,
  ExpandLess as ExpandLessIcon,
  TextFormat as TextFormatIcon,
  WrapText as WrapTextIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/mode-xml';
import 'ace-builds/src-min-noconflict/mode-json5';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/theme-github';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import AppContext from '../../store/app-context';
import DisappearingComponent from '../helpers/DisappearingComponent';
import AlertError from '../helpers/AlertError';
import EditorStatusBar from '../helpers/EditorStatusBar';

function ToolXMLToJSON() {
  const editorXml = useRef(null);
  const editorJson = useRef(null);

  const ctx = useContext(AppContext);
  const { isDarkModeEnabled } = ctx;

  const [editorTheme, setEditorTheme] = useState('monokai');
  const [fontSize, setFontSize] = useState(16);
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [isWrapEnabled, setWrapEnabled] = useState(false);
  const [lineNumber, setLineNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(1);
  const [lineNumberJson, setLineNumberJson] = useState(1);
  const [columnNumberJson, setColumnNumberJson] = useState(1);
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

  const compactXml = input => xmlFormatter(input, { indentation: '', lineSeparator: '' });

  const handleCompress = () => {
    try {
      setMessage('');
      if (!xmlInput.length) {
        return;
      }
      setXmlInput(compactXml(xmlInput));
    } catch (e) {
      showErrorMessage(e.message);
    }
  };

  const handleExpand = () => {
    editorXml.current.editor.session.unfold(null);
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

  const handleFold = () => {
    editorXml.current.editor.session.foldAll(1);
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
    setJsonOutput('');
  };

  const handleCursorChange = () => {
    const { row = 0, column = 0 } = editorXml.current.editor.getCursorPosition();
    setLineNumber(row + 1);
    setColumnNumber(column + 1);
  };

  const handleCursorChangeJson = () => {
    const { row = 0, column = 0 } = editorJson.current.editor.getCursorPosition();
    setLineNumberJson(row + 1);
    setColumnNumberJson(column + 1);
  };

  const handleTransform = () => {
    try {
      setMessage('');
      if (!xmlInput.length) {
        return;
      }
      const result = xmlToJson.xml2json(compactXml(xmlInput), { compact: true, spaces: 0 });
      const json = JSON.stringify(JSON.parse(result), null, tabSize);
      setJsonOutput(json, -1);
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          XML to JSON
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
          <Tooltip title="Transform">
            <Button onClick={handleTransform}>
              <BuildIcon sx={{ fontSize: '1.5em' }} />
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
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <div id="xmlFormatterEditorContainer">
          <AceEditor
            ref={editorXml}
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
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <div id="jsonFormatterEditorContainer">
          <AceEditor
            ref={editorJson}
            mode="json5"
            theme={editorTheme}
            fontSize={fontSize}
            value={jsonOutput}
            onCursorChange={handleCursorChangeJson}
            style={{ width: '100%', height: '70vh' }}
            setOptions={{
              tabSize: tabSize,
              useSoftTabs: true,
              showPrintMargin: false
            }}
          />
          <EditorStatusBar fontSize={fontSize} line={lineNumberJson} column={columnNumberJson} />
        </div>
      </Grid>
    </Grid>
  );
}

export default ToolXMLToJSON;
