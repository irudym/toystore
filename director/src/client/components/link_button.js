/**
 * Link which looks like a button
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { elements } from '../styles/colors';


const buttonStyle = {
  borderRadius: 3,
  background: elements.okButton,
  color: elements.buttonCaption,
  fontSize: elements.buttonFontSize,
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `1px solid ${elements.okButtonBorder}`,
  padding: '0.8rem 0.8rem',
};


const LinkButton = ({
  style,
  to,
  children,
}) => (
  <Link to={to} style={{ ...buttonStyle, ...style }} className="director-button">
    {children}
  </Link>
);

LinkButton.propTypes = {
  to: PropTypes.object.isRequired,
  style: PropTypes.object,
  children: PropTypes.object.isRequired,
};


LinkButton.defaultProps = {
  style: {},
};

export default LinkButton;
