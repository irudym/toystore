import React from 'react';
import PropTypes from 'prop-types';
// import Radium from 'radium';

import SideMenuItem from './side_menu_item';


const menuStyle = {
  marginTop: '5.1rem',
  // background: 'transparent',
  listStyleType: 'none',
  padding: 0,
};

const SideMenu = ({ items }) => (
  <ul style={menuStyle}>
    {items.map(item => (
      <SideMenuItem item={item} key={item.id} />
    ))}
  </ul>
);

SideMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string,
  })).isRequired,
};

export default SideMenu;
