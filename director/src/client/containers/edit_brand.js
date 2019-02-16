import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BrandView from '../components/views/brand_view';

import { brands } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class EditBrand extends React.Component {
  state = {
    loading: true,
    name: '',
    name_eng: '',
    description: '',
    image: null,
    errors: {},
  }

  componentDidMount() {
    const { auth: { token }, fetchBrand } = this.props;

    fetchBrand({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('NEW EDIT CATEGORY PROPS: ', nextProps);
    if (nextProps.brands.current && nextProps.brands.current.id !== prevState.id) {
      return ({
        ...nextProps.brands.current,
        loading: false,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history, setBrand } = this.props;

    // clear Redux state record of the current Material
    setBrand({ name: '', name_eng: '', description: '', id: -1, image: null });
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, name_eng } = this.state;
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
    const { auth: { token } } = this.props;
    const { id, name, name_eng, description, image } = this.state;

    this.props.updateBrand({
      serverUrl,
      token,
      record: {
        id,
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
    const { loading, errors, name } = this.state;
    // wait until all data loaded to the this.state fields related to brand
    // to avoid annoying flickering
    // TODO: use state.loading for this purposes
    if (name === '') return null;

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
        header="Edit Brand"
        brand={this.state}
      />
    );
  }
}

EditBrand.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchBrand: PropTypes.func.isRequired,
  setBrand: PropTypes.func.isRequired,
  updateBrand: PropTypes.func.isRequired,
  brands: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    brands: state.brands,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchBrand: value => dispatch(brands.fetchRecord(value)),
  setBrand: value => dispatch(brands.setRecord(value)),
  updateBrand: value => dispatch(brands.update(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBrand);
