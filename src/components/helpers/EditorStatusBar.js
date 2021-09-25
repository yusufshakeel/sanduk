import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const spanStyle = {
  marginRight: '5px',
  padding: '0 10px',
  borderRight: '1px solid #aaa',
  display: 'inline-block'
};

function EditorStatusBar(props) {
  return (
    <div style={{ backgroundColor: '#333', padding: '10px', fontSize: '0.8em' }}>
      <span style={spanStyle}>
        <Typography fontFamily="monospace">
          Ln: {props.line} Col: {props.column}
        </Typography>
      </span>
      <span style={spanStyle}>
        <Typography fontFamily="monospace">Font {props.fontSize}px</Typography>
      </span>
      <span style={spanStyle}>
        <Typography fontFamily="monospace">Spaces {props.tabSize}</Typography>
      </span>
    </div>
  );
}

EditorStatusBar.propTypes = {
  line: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  column: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default EditorStatusBar;
