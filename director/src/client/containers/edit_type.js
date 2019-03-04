import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TypeView from '../components/views/type_view';

import { types } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class EditType extends React.Component {
  state = {
    loading: false,
    name: '',
    name_eng: '',
    description: '',
    errors: {},
  }

  componentDidMount() {
    const { auth: { token } } = this.props;

    this.props.fetchType({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.types.current && nextProps.types.current.id !== prevState.id) {
      return ({
        id: nextProps.types.current.id,
        name: nextProps.types.current.name,
        name_eng: nextProps.types.current.name_eng,
        description: nextProps.types.current.description,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history } = this.props;

    // clear Redux state record of the current Type
    this.props.setType({ name: '', name_eng: '', description: '', id: -1 });
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
    const { id, name, name_eng, description } = this.state;

    console.log('EditType: Submit: ', this.state);
    this.props.updateType({
      serverUrl,
      token,
      record: {
        id,
        name,
        name_eng,
        description,
      },
    });

    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ nameEng: e.target.value });

  handleDescriptionChange = e => this.setState({ description: e.target.value });

  render() {
    const { loading, errors } = this.state;
    // wait until all data loaded to the this.state fields related to type
    // to avoid annoying flickering
    // TODO: use state.loading for this purposes
    if (this.state.name === '' || this.state.name_eng === '') return null;

    return (
      <TypeView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onDescriptionChange={this.handleDescriptionChange}
        errors={errors}
        header="Edit Type"
        type={this.state}
      />
    );
  }
}

EditType.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchType: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  updateType: PropTypes.func.isRequired,
  types: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    types: state.types,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchType: value => dispatch(types.fetchRecord(value)),
  setType: value => dispatch(types.setRecord(value)),
  updateType: value => dispatch(types.update(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditType);
