import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MaterialView from '../components/views/material_view';

import { fetchMaterial, setMaterial, updateMaterial } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class EditMaterial extends React.Component {
  state = {
    loading: false,
    name: '',
    nameEng: '',
    description: '',
    errors: {},
  }

  componentDidMount() {
    const { auth: { token } } = this.props;
    console.log('Edit materials dialog mounted: ', this.props.match.params.id);

    this.props.fetchMaterial({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('NEW EDIT CATEGORY PROPS: ', nextProps);
    if (nextProps.materials.current && nextProps.materials.current.id !== prevState.id) {
      return ({
        id: nextProps.materials.current.id,
        name: nextProps.materials.current.name,
        nameEng: nextProps.materials.current.name_eng,
        description: nextProps.materials.current.description,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history } = this.props;

    // clear Redux state record of the current Material
    this.props.setMaterial({ name: '', name_eng: '', description: '', id: -1 });
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, nameEng } = this.state;
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
    const { id, name, nameEng, description } = this.state;

    console.log('EditMaterial: Submit: ', this.state);
    this.props.updateMaterial({
      serverUrl,
      token,
      material: {
        id,
        name,
        name_eng: nameEng,
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
    // wait until all data loaded to the this.state fields related to material
    // to avoid annoying flickering
    // TODO: use state.loading for this purposes
    if (this.state.name === '' || this.state.nameEng === '') return null;

    return (
      <MaterialView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onDescriptionChange={this.handleDescriptionChange}
        errors={errors}
        header="Edit Material"
        material={this.state}
      />
    );
  }
}

EditMaterial.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchMaterial: PropTypes.func.isRequired,
  setMaterial: PropTypes.func.isRequired,
  updateMaterial: PropTypes.func.isRequired,
  materials: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    materials: state.materials,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchMaterial: value => dispatch(fetchMaterial(value)),
  setMaterial: value => dispatch(setMaterial(value)),
  updateMaterial: value => dispatch(updateMaterial(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMaterial);
