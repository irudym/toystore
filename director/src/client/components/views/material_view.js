import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
} from 'semantic-ui-react';

import ModalView from './modal_view';


const MaterialView = ({
  onClose,
  onSubmit,
  onNameChange,
  onNameEngChange,
  onDescriptionChange,
  loading,
  errors,
  header,
  material,
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
          placeholder="Material name..."
          onChange={onNameChange}
          error={errors.Name !== undefined}
          value={material.name}
        />
        <Form.Input
          label="NameEng"
          placeholder="Material name in english..."
          onChange={onNameEngChange}
          error={errors.NameEng !== undefined}
          value={material.nameEng}
        />
        <Form.TextArea
          label="Description"
          placeholder="Description of the material..."
          onChange={onDescriptionChange}
          error={errors.Description !== undefined}
          value={material.description}
        />
      </Form>
    </ModalView.Content>
    <ModalView.Actions>
      <Button onClick={onSubmit}> Ok </Button>
      <Button onClick={onClose}> Cancel </Button>
    </ModalView.Actions>
  </ModalView>
);

MaterialView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  header: PropTypes.string,
  material: PropTypes.object,
};

MaterialView.defaultProps = {
  header: 'Add a Material',
  material: {},
};

export default MaterialView;
