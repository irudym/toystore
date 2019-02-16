import React from 'react';
import PropTypes from 'prop-types';
// import Radium from 'radium';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

// import { Icon as CandoneIcon } from './icon';


import layout, { mediaStyles } from '../styles/layout';
import colors from '../styles/colors';


const menuStyle = {
  link: {
    display: 'block',
    textDecoration: 'none',
    // background: 'transparent',
  },
  item: {
    padding: `${layout.sideMenuItemPadding} 0`,
    background: 'transparent',
    ':hover': {
      background: colors.sideMenu.highlight,
      color: 'white',
    },
  },
  icon: {
    width: '2.5rem',
    display: 'inline-block',
    fontSize: '1rem',
  },
  iconHover: {
    width: '2.5rem',
    display: 'inline-block',
    fontSize: '1.4rem',
    color: colors.sideMenu.iconHighlight,
  },
  text: {
    display: 'inline-block',
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '0.07rem',
    fontSize: '1rem',
  },
  list: {
    marginLeft: '1.5rem',
    textTransform: 'uppercase',
  },
  active: {
    borderRight: `5px solid ${colors.sideMenu.active}`,
    display: 'block',
    background: 'transparent',
    textDecoration: 'none',
  },
};


class SideMenuItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <NavLink
        to={item.link}
        style={menuStyle.link}
        activeStyle={menuStyle.active}
        activeClassName="menuSelected"
        key={item.id * 100}
        className="side-menu"
      >
        <div style={menuStyle.item} key={item.id}>
          <li style={menuStyle.list}>
            <div style={menuStyle.icon}>
              <Icon name={item.icon} />
            </div>
            {item.title}
          </li>
        </div>
      </NavLink>
    );
  }
}


SideMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

export default SideMenuItem;
