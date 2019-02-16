import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const deleteButtonStyle = {
  // position: 'absolute',
  // left: -10,
  // bottom: 0,
  background: 'transparent',
  fontSize: '0.8rem',
  margin: 0,
  padding: 0,
  // display: 'none',
  // opacity: 0,
  // transitionDuration: '0.5s',
};

const DeleteIcon = ({ onDelete }) => (
  <Button className="delete-icon" icon float="right" onClick={(e) => { e.stopPropagation(); onDelete(); }} style={deleteButtonStyle}>
    <Icon name="trash" />
  </Button>
);

DeleteIcon.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteIcon;
