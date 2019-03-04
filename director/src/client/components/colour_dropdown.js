import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Dropdown,
  Label,
} from 'semantic-ui-react';

const colourBoxStyle = hex => ({
  height: '2rem',
  width: '2rem',
  background: `#${hex}`,
  padding: '0.2rem',
});

const boxTextStyle = {
  lineHeight: '2rem',
  marginLeft: '1rem',
};

const labelStyle = error => ({
  fontSize: '.92857143em',
  fontWeight: 700,
  color: error ? '#9f3a38' : 'black',
  padding: 0,
  marginRight: '1rem',
});

const ColourBox = ({ hex, name }) => (
  <div style={{ display: 'flex' }}>
    <div style={colourBoxStyle(hex)} />
    <div style={boxTextStyle}>{name}</div>
  </div>
);

const ColourDropdown = ({
  options,
  onChange,
  loading,
  defaultValue,
  error,
}) => {
  // inject content
  const newOptions = options.map(option => ({
    key: option.id,
    value: option.id,
    text: option.name,
    content: <ColourBox hex={option.hex} name={option.name} />,
  }));
  return (
    <Form.Group inline>
      <div style={labelStyle(error)}>Colours</div>
      <Dropdown
        placeholder="Select colours"
        fluid
        search
        selection
        multiple
        onChange={onChange}
        defaultValue={defaultValue}
        loading={loading}
        options={newOptions}
      />
    </Form.Group>
  );
};

ColourDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  defaultValue: PropTypes.object,
  error: PropTypes.bool.isRequired,
};

ColourDropdown.defaultProps = {
  defaultValue: null,
};

export default ColourDropdown;
