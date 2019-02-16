import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryView from '../components/views/category_view';

import { categories } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

export class AddCategory extends React.Component {
  state = {
    loading: false,
    name: '',
    name_eng: '',
    errors: {},
  }

  handleClose = () => {
    const { history } = this.props;
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, name_eng } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { Name: 'Name field cannot be blank' };
    }
    if (name_eng.length === 0 || !name_eng.trim()) {
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
    const { name, name_eng } = this.state;

    this.props.createCategory({
      serverUrl,
      token,
      record: {
        name,
        name_eng,
      },
    });
    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ name_eng: e.target.value });

  render() {
    const { loading, errors } = this.state;
    return (
      <CategoryView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        errors={errors}
      />
    );
  }
}

AddCategory.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  createCategory: value => dispatch(categories.create(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
