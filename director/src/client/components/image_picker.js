import React from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Image } from 'semantic-ui-react';

const addStyle = {
  fontSize: '7rem',
  fontWeight: '800',
  color: 'rgba(0,0,0,.3)',
  height: '8rem',
  padding: '1rem',
  textAlign: 'center',
  cursor: 'pointer',
};

const loadingStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: 'rgba(0,0,0,.3)',
  height: '8rem',
  padding: '1rem',
  textAlign: 'center',
};

const inputStyle = {
  width: 1,
  height: 1,
  opacity: 0,
  position: 'absolute',
  overflow: 'hidden',
  zIndex: -1,
  display: 'none',
};

const deleteIconStyle = {
  cursor: 'pointer',
};

/**
 *
 * @param {object} image - current loaded image (to submit)
 * @param {func} onFileChange - add image handler
 * @param {func} onDelete - clear image handler
 * @param {bool} loading - show loading message
 * @param {func} setRef - set reference to input element to clear it
 * @param {number} id - referenced id to distinguish
 */
const ImagePicker = ({
  image,
  onDelete,
  onFileChange,
  setRef,
  loading,
  id,
}) => (
  <Card>
    <input
      id={`imageload-${id}`}
      type="file"
      accept="image/*"
      capture="camera"
      onChange={onFileChange}
      style={inputStyle}
      ref={setRef}
    />
    {image ? <Image src={image} />
      : (
        <Card.Content style={{ overflow: 'hidden' }}>
          {loading ? <div style={loadingStyle}>loading...</div> : <label htmlFor={`imageload-${id}`}><div style={addStyle}>+</div></label> }
        </Card.Content>
      )}
    {image ? (
      <Card.Content extra>
        <Icon onClick={onDelete} name="trash" style={deleteIconStyle} />
      </Card.Content>
    ) : null
    }
  </Card>
);

ImagePicker.propTypes = {
  image: PropTypes.string.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
};

export default ImagePicker;
