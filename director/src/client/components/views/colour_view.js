import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
  Card,
} from 'semantic-ui-react';

import ModalView from './modal_view';

const previewStyle = {
  marginTop: '2.5rem',
};

const ColourView = ({
  onClose,
  onSubmit,
  onNameChange,
  onNameEngChange,
  onHexChange,
  loading,
  errors,
  header,
  colour,
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
          placeholder="Color name..."
          onChange={onNameChange}
          error={errors.name !== undefined}
          value={colour.name}
        />
        <Form.Input
          label="NameEng"
          placeholder="Color name in english..."
          onChange={onNameEngChange}
          error={errors.nameEng !== undefined}
          value={colour.nameEng}
        />
        <Form.Input
          label="HEX #"
          placeholder="Enter color code in HEX format..."
          onChange={onHexChange}
          error={errors.hex !== undefined}
          value={colour.hex}
        />
      </Form>
      <div style={previewStyle}>
        <b>Preview</b>
        <Card>
          <div style={{ background: `#${colour.hex}`, width: '100%', height: 100 }} />
          <Card.Content>
            <Card.Header>{colour.hex}</Card.Header>
          </Card.Content>
        </Card>
      </div>
    </ModalView.Content>
    <ModalView.Actions>
      <Button onClick={onSubmit}> Ok </Button>
      <Button onClick={onClose}> Cancel </Button>
    </ModalView.Actions>
  </ModalView>
);

ColourView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  onHexChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  header: PropTypes.string,
  colour: PropTypes.object,
};

ColourView.defaultProps = {
  header: 'Add Colour',
  colour: {},
};

export default ColourView;
