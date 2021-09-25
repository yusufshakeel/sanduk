import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

function AlertError(props) {
  return (
    <Alert variant="filled" severity="error">
      {props.children}
    </Alert>
  );
}

AlertError.propTypes = {
  children: PropTypes.node
};

export default AlertError;
