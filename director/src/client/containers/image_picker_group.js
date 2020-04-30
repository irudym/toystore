import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Label } from 'semantic-ui-react';

import ImagePicker from './image_picker';

const gridStyle = error => ({
  background: error ? '#fff6f6' : 'transparent',
  border: error ? 'solid 1 px #9f3a38' : 'none',
  margin: '0rem',
});

const labelStyle = error => ({
  fontSize: '.92857143em',
  fontWeight: 700,
  color: error ? '#9f3a38' : 'black',
  padding: 0,
  marginTop: '1rem',
});

const containerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-around',
};

const itemStyle = {
  padding: '1rem',
  textAlign: 'center',
  width: '15rem',
};

const ImagePickerGroup = ({
  images,
  onImageChange,
  count,
  error,
}) => (
  <Grid style={gridStyle(error)}>
    <div style={labelStyle(error)}>Pictures</div>
    <div style={containerStyle}>
      {Array.from({ length: count }).map((el, index) => (
        <div style={itemStyle}>
          <ImagePicker
            key={index * 10}
            image={images[index]}
            onImageChange={img => onImageChange(img, index)}
            id={index * 10}
          />
        </div>
      ))}
    </div>
  </Grid>
);

ImagePickerGroup.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onImageChange: PropTypes.func.isRequired,
  count: PropTypes.number,
  error: PropTypes.bool.isRequired,
};

ImagePickerGroup.defaultProps = {
  images: [],
  count: 6,
};

export default ImagePickerGroup;
