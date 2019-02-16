import React from 'react';
import PropTypes from 'prop-types';

import SideMenu from './side_menu';
import layout from '../styles/layout';

const sidebarStyle = {
  position: 'fixed',
  width: layout.sidebarWidth,
  height: '100%',
  background: 'black',
};

const Sidebar = ({ menuItems }) => (
  <div className="sidebar" style={sidebarStyle}>
    <SideMenu items={menuItems} />
  </div>
);

Sidebar.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string,
  })).isRequired,
};

export default Sidebar;
