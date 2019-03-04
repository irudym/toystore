import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
} from 'semantic-ui-react';

import ModalView from './modal_view';
import ImagePicker from '../../containers/image_picker';


const BrandView = ({
  onClose,
  onSubmit,
  onNameChange,
  onNameEngChange,
  onDescriptionChange,
  onImageChange,
  loading,
  errors,
  header,
  brand,
}) => (
  <ModalView onClose={onClose} header={header} loading={loading}>
    <ModalView.Content>
      {
        Object.keys(errors).length !== 0
          ? (
            <Message
              error
              header="There was some errors in your data"
              list={Object.values(errors)}
            />
          )
          : null
      }
      <Form>
        <Form.Input
          label="Name"
          placeholder="Brand name..."
          onChange={onNameChange}
          error={errors.Name !== undefined}
          value={brand.name}
        />
        <Form.Input
          label="NameEng"
          placeholder="Brand name in english..."
          onChange={onNameEngChange}
          error={errors.NameEng !== undefined}
          value={brand.name_eng}
        />
        <Form.TextArea
          label="Description"
          placeholder="Description of the brand..."
          onChange={onDescriptionChange}
          error={errors.Description !== undefined}
          value={brand.description}
        />
      </Form>
      <ImagePicker onImageChange={onImageChange} image={brand.picture} />
    </ModalView.Content>
    <ModalView.Actions>
      <Button onClick={onSubmit}> Ok </Button>
      <Button onClick={onClose}> Cancel </Button>
    </ModalView.Actions>
  </ModalView>
);

BrandView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  header: PropTypes.string,
  brand: PropTypes.object,
};

BrandView.defaultProps = {
  header: 'Add a Brand',
  brand: {},
};

export default BrandView;
