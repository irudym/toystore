import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BrandView from '../components/views/brand_view';

import { brands } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class AddBrand extends React.Component {
  state = {
    loading: false,
    name: '',
    name_eng: '',
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
    const { name, name_eng, description } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { Name: 'Name field cannot be blank' };
    }
    // if (nameEng.length === 0 || !nameEng.trim()) {
    //  errors = { ...errors, NameEng: 'Name in english cannot be blank' };
    // }
    return errors;
  }

  handleSubmit = () => {
    const errors = this.validation();
    if (Object.keys(errors).length !== 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });
    const { auth: { token }, createBrand } = this.props;
    const { name, name_eng, description, image } = this.state;

    createBrand({
      serverUrl,
      token,
      record: {
        name,
        name_eng,
        description,
        image,
      },
    });
    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ name_eng: e.target.value });

  handleDescriptionChange = e => this.setState({ description: e.target.value });

  handleImageChange = image => this.setState({ image });

  render() {
    const { loading, errors } = this.state;
    return (
      <BrandView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onDescriptionChange={this.handleDescriptionChange}
        onImageChange={this.handleImageChange}
        errors={errors}
      />
    );
  }
}

AddBrand.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createBrand: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  createBrand: value => dispatch(brands.create(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBrand);
