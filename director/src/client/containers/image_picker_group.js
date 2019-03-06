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

const ImagePickerGroup = ({
  images,
  onImageChange,
  count,
  error,
}) => (
  <Grid style={gridStyle(error)}>
    <div style={labelStyle(error)}>Pictures</div>
    {Array.from({ length: count / 2 }).map((el, index) => (
      <Grid.Row>
        <Grid.Column width={4}>
          <ImagePicker
            key={index * 10}
            image={images[2 * index]}
            onImageChange={img => onImageChange(img, 2 * index)}
            id={2 * index}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <ImagePicker
            key={index * 10 + 1}
            image={images[2 * index + 1]}
            onImageChange={img => onImageChange(img, 2 * index + 1)}
            id={index * 10 + 1}
          />
        </Grid.Column>
      </Grid.Row>
    ))}
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
