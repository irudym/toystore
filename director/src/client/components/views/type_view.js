import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
} from 'semantic-ui-react';

import ModalView from './modal_view';


const TypeView = ({
  onClose,
  onSubmit,
  onNameChange,
  onNameEngChange,
  onDescriptionChange,
  loading,
  errors,
  header,
  type,
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
          placeholder="Type name..."
          onChange={onNameChange}
          error={errors.Name !== undefined}
          value={type.name}
        />
        <Form.Input
          label="English Name"
          placeholder="Type name in english..."
          onChange={onNameEngChange}
          error={errors.NameEng !== undefined}
          value={type.name_eng}
        />
        <Form.TextArea
          label="Description"
          placeholder="Description of the type..."
          onChange={onDescriptionChange}
          error={errors.Description !== undefined}
          value={type.description}
        />
      </Form>
    </ModalView.Content>
    <ModalView.Actions>
      <Button onClick={onSubmit}> Ok </Button>
      <Button onClick={onClose}> Cancel </Button>
    </ModalView.Actions>
  </ModalView>
);

TypeView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  header: PropTypes.string,
  type: PropTypes.object,
};

TypeView.defaultProps = {
  header: 'Add a Type',
  type: {},
};

export default TypeView;
