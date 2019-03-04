import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourView from '../components/views/colour_view';
import { colours } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class AddColour extends React.Component {
  state = {
    loading: false,
    errors: {},
    name: '',
    nameEng: '',
    hex: 'ffffff',
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, nameEng, hex } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { name: 'Name field cannot be blank' };
    }
    if (nameEng.length === 0 || !nameEng.trim()) {
      errors = { ...errors, nameEng: 'Name in english cannot be blank' };
    }
    if (hex.length === 0 || !hex.trim()) {
      errors = { ...errors, hex: 'HEX code cannot be blank' };
    }
    return errors;
  }

  handleSubmit = () => {
    const errors = this.validation();
    if (Object.keys(errors).length !== 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });
    const { auth: { token } } = this.props;
    const { name, nameEng, hex } = this.state;

    this.props.createColour({
      serverUrl,
      record: {
        token,
        name,
        nameEng,
        hex,
      },
    });
    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ nameEng: e.target.value });

  handleHexChange = e => this.setState({ hex: e.target.value });

  render() {
    const { loading, errors } = this.state;
    return (
      <ColourView
        onClose={this.handleClose}
        loading={loading}
        errors={errors}
        colour={this.state}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onHexChange={this.handleHexChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

AddColour.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createColour: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  createColour: value => dispatch(colours.create(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddColour);
