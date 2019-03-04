import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TypeView from '../components/views/type_view';

import { types } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class AddType extends React.Component {
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
    const { name, name_eng, description } = this.state;

    this.props.createType({
      serverUrl,
      token,
      record: {
        name,
        name_eng,
        description,
      },
    });
    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ name_eng: e.target.value });

  handleDescriptionChange = e => this.setState({ description: e.target.value });

  render() {
    const { loading, errors } = this.state;
    return (
      <TypeView
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

AddType.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createType: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  createType: value => dispatch(types.create(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddType);
