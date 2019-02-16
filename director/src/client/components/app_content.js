import React from 'react';
import PropTypes from 'prop-types';

import layout from '../styles/layout';

const appContentStyle = {
  marginLeft: layout.sidebarWidth,
  padding: '1rem 3rem',
};

const AppContent = ({ children }) => (
  <div className="main" style={appContentStyle}>
    {children}
  </div>
);

AppContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default AppContent;
