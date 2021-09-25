import { Button, ButtonGroup, Grid, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../store/app-context';
import immutabilityHelper from 'immutability-helper';
import AceEditor from 'react-ace';
import markdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/mode-markdown';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/theme-github';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import {
  Build as BuildIcon,
  Delete as DeleteIcon,
  TextFormat as TextFormatIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';
import EditorStatusBar from '../helpers/EditorStatusBar';
import DisappearingComponent from '../helpers/DisappearingComponent';
import AlertError from '../helpers/AlertError';
const markdown = markdownIt();

function ToolMarkdown() {
  const editorMarkdown = useRef(null);
  const markdownOutput = useRef(null);
  const ctx = useContext(AppContext);
  const { isDarkModeEnabled } = ctx;

  const [editorTheme, setEditorTheme] = useState('monokai');
  const [markdownInput, setMarkdownInput] = useState('');
  // const [markdownOutput, setMarkdownOutput] = useState('');
  const [tabSize] = useState(2);
  const [lineNumber, setLineNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [message, setMessage] = useState(<React.Fragment />);

  useEffect(() => {
    const editorTheme = isDarkModeEnabled ? 'monokai' : 'github';
    setEditorTheme(editorTheme);
  }, [isDarkModeEnabled]);

  const handleCursorChange = () => {
    const { row = 0, column = 0 } = editorMarkdown.current.editor.getCursorPosition();
    setLineNumber(row + 1);
    setColumnNumber(column + 1);
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
    setMarkdownInput('');
  };

  const renderMarkdown = () => {
    const html = markdown.render(markdownInput);

    const sanitizedHtml = sanitizeHtml(html, {
      transformTags: {
        a: function (tagName, attribs) {
          const modifiedAttributes = immutabilityHelper(attribs, {
            href: { $set: '#' }
          });
          return {
            tagName: tagName,
            attribs: modifiedAttributes
          };
        }
      }
    });

    const enrichedHtml = `
      <style>
      pre { border: 1px solid #aaa; background-color: #eee; padding: 5px; font-family: monospace; }
      </style>
      ${sanitizedHtml}`;

    markdownOutput.current.contentDocument.write(enrichedHtml);
    markdownOutput.current.contentDocument.close();
  };

  const handleTransform = () => {
    try {
      renderMarkdown();
    } catch (e) {
      setMessage(
        <DisappearingComponent>
          <AlertError>{e.message}</AlertError>
        </DisappearingComponent>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Markdown
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ p: 1 }} textAlign="center">
        <ButtonGroup variant="outlined">
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
        <div id="markdownEditorContainer">
          <AceEditor
            ref={editorMarkdown}
            mode="markdown"
            theme={editorTheme}
            fontSize={fontSize}
            value={markdownInput}
            onChange={e => setMarkdownInput(e)}
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
        <div id="markdownOutputContainer">
          <iframe
            ref={markdownOutput}
            title="markdownOutputContainer"
            style={{
              backgroundColor: 'rgba(255,255,255, 0.9)',
              width: '100%',
              height: '73.5vh',
              border: '1px solid #444',
              overflow: 'scroll',
              padding: '5px'
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default ToolMarkdown;
