import React from 'react';
import PropTypes from 'prop-types';


const headerStyle = {
  padding: '1rem 0 4rem',
};

const h2Style = {
  fontFamily: 'Lato',
  fontSize: '2.4rem',
  fontWeight: 400,
  margin: 0,
  paddingBottom: '2rem',
};

const Header = ({ title, children }) => (
  <div style={headerStyle}>
    <h2 style={h2Style}>
      {title}
    </h2>
    {children}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Header.defaultProps = {
  title: null,
  children: null,
};

export default Header;
