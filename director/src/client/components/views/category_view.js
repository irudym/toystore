import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
} from 'semantic-ui-react';

import ModalView from './modal_view';


const CategoryView = ({
  onClose,
  onSubmit,
  onNameChange,
  onNameEngChange,
  loading,
  errors,
  header,
  category,
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
          placeholder="Category name..."
          onChange={onNameChange}
          error={errors.Name !== undefined}
          value={category.name}
        />
        <Form.Input
          label="NameEng"
          placeholder="Category name in english..."
          onChange={onNameEngChange}
          error={errors.NameEng !== undefined}
          value={category.name_eng}
        />
      </Form>
    </ModalView.Content>
    <ModalView.Actions>
      <Button onClick={onSubmit}> Ok </Button>
      <Button onClick={onClose}> Cancel </Button>
    </ModalView.Actions>
  </ModalView>
);

CategoryView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  header: PropTypes.string,
  category: PropTypes.object,
};

CategoryView.defaultProps = {
  header: 'Add a Category',
  category: {},
};

export default CategoryView;
