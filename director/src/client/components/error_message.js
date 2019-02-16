import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ErrorMessage = ({ message, onClose, showLogout }) => (
  <Message
    negative
    onDismiss={onClose}
  >
    <h3>
      The last action raised an error!
    </h3>
    {message}
    {'. '}
    {showLogout ? (
      <>
        Suggest to
        {' '}
        <Link to="/logout">Logout</Link>
      </>
    ) : null}
  </Message>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorMessage;
