import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MaterialView from '../components/views/material_view';

import { createMaterial } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class AddMaterial extends React.Component {
  state = {
    loading: false,
    name: '',
    nameEng: '',
    description: '',
    errors: {},
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, nameEng, description } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { Name: 'Name field cannot be blank' };
    }
    if (nameEng.length === 0 || !nameEng.trim()) {
      errors = { ...errors, NameEng: 'Name in english cannot be blank' };
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
    const { name, nameEng, description } = this.state;

    this.props.createMaterial({
      serverUrl,
      token,
      name,
      nameEng,
      description,
    });
    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ nameEng: e.target.value });

  handleDescriptionChange = e => this.setState({ description: e.target.value });

  render() {
    const { loading, errors } = this.state;
    return (
      <MaterialView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onDescriptionChange={this.handleDescriptionChange}
        errors={errors}
      />
    );
  }
}

AddMaterial.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  createMaterial: value => dispatch(createMaterial(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterial);
