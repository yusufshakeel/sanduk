import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

function AlertSuccess(props) {
  return (
    <Alert variant="filled" severity="success">
      {props.children}
    </Alert>
  );
}

AlertSuccess.propTypes = {
  children: PropTypes.node
};

export default AlertSuccess;
