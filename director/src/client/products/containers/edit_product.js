import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductView from '../components/product_view';

import { products } from '../../../redux/actions';
import serverUrl from '../../../globals/api_server';

class EditProduct extends React.Component {
  state = {
    loading: true,
    name: '',
    name_eng: '',
    description: '',
    pictures: null,
    errors: {},
  }

  componentDidMount() {
    const { auth: { token }, fetchProduct } = this.props;

    fetchProduct({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('NEW EDIT CATEGORY PROPS: ', nextProps);
    if (nextProps.products.current && nextProps.products.current.id !== prevState.id) {
      return ({
        ...nextProps.products.current,
        loading: false,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history, setProduct } = this.props;

    // clear Redux state record of the current Material
    setProduct({ name: '', name_eng: '', description: '', id: -1, picture: null });
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
    const { id, name, name_eng, description, pictures } = this.state;

    this.props.updateProduct({
      serverUrl,
      token,
      record: {
        id,
        name,
        name_eng,
        description,
        pictures,
      },
    });

    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ name_eng: e.target.value });

  handleDescriptionChange = e => this.setState({ description: e.target.value });

  handleImageChange = (index, pictures) => this.setState({ pictures });

  render() {
    const { loading, errors, name } = this.state;
    // wait until all data loaded to the this.state fields related to brand
    // to avoid annoying flickering
    // TODO: use state.loading for this purposes
    if (name === '') return null;

    return (
      <ProductView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onDescriptionChange={this.handleDescriptionChange}
        // onImageChange={this.handleImageChange}
        errors={errors}
        header="Edit Product"
        product={this.state}
      />
    );
  }
}

EditProduct.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  setProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    products: state.products,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchProduct: value => dispatch(products.fetchRecord(value)),
  setProduct: value => dispatch(products.setRecord(value)),
  updateProduct: value => dispatch(products.update(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
