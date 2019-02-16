import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import LinkButton from './link_button';


const AddButton = ({
  title,
  to,
  style,
  noicon,
}) => {
  let article = 'a';
  if (title.toUpperCase().charAt(0) === 'A' || title.toUpperCase().charAt(0) === 'E') article = 'an';
  return (
    <LinkButton to={to} style={{ ...style }}>
      {
        noicon
          ? null
          : <Icon name="plus" />
      }
      Add
      {' '}
      {`${article} ${title}`}
    </LinkButton>
  );
};

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.object.isRequired,
  style: PropTypes.object,
  noicon: PropTypes.bool,
};


AddButton.defaultProps = {
  style: {},
  noicon: false,
};

export default AddButton;
