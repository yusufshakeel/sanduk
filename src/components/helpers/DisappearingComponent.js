import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DisappearingComponent(props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, props.timeout);

    return () => {
      clearTimeout(timeId);
    };
  }, [props.timeout]);

  if (!show) {
    return null;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
}

DisappearingComponent.propTypes = {
  children: PropTypes.node.isRequired,
  timeout: PropTypes.number
};

DisappearingComponent.defaultProps = {
  timeout: 5000
};

export default DisappearingComponent;
