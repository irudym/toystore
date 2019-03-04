import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductView from '../components/product_view';

import { products, postError } from '../../../redux/actions';
import serverUrl from '../../../globals/api_server';
import * as API from '../../../lib/api';
import { toOptionsList, toOptionsListWithImages } from '../../../lib/utils';

class AddProduct extends React.Component {
  state = {
    loading: false,
    name: '',
    name_eng: '',
    description: '',
    errors: {},
    brands: [],
    categories: [],
    types: [],
    materials: [],
    colours: [],
    pictures: [],
    brand: '',
    category: '',
    productTypes: [],
    productMaterials: [],
    productColours: [],
  }

  async componentDidMount() {
    const {
      auth: { token },
      postError,
    } = this.props;

    // fetch brands
    try {
      const brands = await API.brands.fetch({ url: serverUrl, token });
      this.setState({ brands: toOptionsListWithImages(brands) });
    } catch (error) {
      console.log(`Cannot catch brands data from trash due to error: ${error.message} `);
      postError(error);
    }

    // fetch categories
    try {
      const categories = await API.categories.fetch({ url: serverUrl, token });
      this.setState({ categories: toOptionsList(categories) });
    } catch (error) {
      console.log(`Cannot catch categories data from trash due to error: ${error.message} `);
      postError(error);
    }

    // fetch types
    try {
      const types = await API.types.fetch({ url: serverUrl, token });
      this.setState({ types: toOptionsList(types) });
    } catch (error) {
      console.log(`Cannot catch types data from trash due to error: ${error.message} `);
      postError(error);
    }

    // fetch materials
    try {
      const materials = await API.materials.fetch({ url: serverUrl, token });
      this.setState({ materials: toOptionsList(materials) });
    } catch (error) {
      console.log(`Cannot catch materials data from trash due to error: ${error.message} `);
      postError(error);
    }

    // fetch colours
    try {
      const colours = await API.colours.fetch({ url: serverUrl, token });
      this.setState({ colours });
    } catch (error) {
      console.log(`Cannot catch colours data from trash due to error: ${error.message} `);
      postError(error);
    }
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, name_eng, description, pictures } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { Name: 'Name field cannot be blank' };
    }
    if (name_eng.length === 0 || !name_eng.trim()) {
      errors = { ...errors, NameEng: 'Name in english cannot be blank' };
    }
    if (description.length === 0 || !description.trim()) {
      errors = { ...errors, Description: 'Description cannot be blank' };
    }
    if (pictures.filter(Boolean).length === 0) {
      errors = { ...errors, Pictures: 'Product should have at least one picture' };
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
    const { auth: { token }, createProduct } = this.props;
    const {
      name,
      name_eng,
      description,
      pictures,
      brand,
      category,
      productTypes,
      productMaterials,
      productColours,
    } = this.state;

    const record = {
      name,
      name_eng,
      description,
      brand,
      category,
      types: productTypes,
      materials: productMaterials,
      colours: productColours,
      pictures: pictures.filter(Boolean),
    };

    console.log('Commit product: ', record);

    createProduct({
      serverUrl,
      token,
      record,
    });
    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ name_eng: e.target.value });

  handleDescriptionChange = e => this.setState({ description: e.target.value });

  handleBrandChange = (e, data) => this.setState({ brand: data.value });

  handleCategoryChange = (e, data) => this.setState({ category: data.value });

  handleTypesChange = (e, data) => this.setState({ productTypes: data.value });

  handleMaterialsChange = (e, data) => this.setState({ productMaterials: data.value });

  handleColoursChange = (e, data) => this.setState({ productColours: data.value });


  handleImageChange = (picture, index) => {
    const { pictures } = this.state;

    console.log('Change image for index: ', index);
    if (index >= pictures.length || index === -1) {
      this.setState({
        pictures: [...pictures, picture],
      });
    } else {
      pictures[index] = picture;
      this.setState({ pictures });
    }
  }

  render() {
    const { loading, errors, brands, categories, types, materials, colours, pictures } = this.state;
    const optionLoading = {
      brand : brands.length === 0,
      category: categories.length === 0,
      types: types.length === 0,
      materials: materials.length === 0,
      colours: colours.length === 0,
    };
    return (
      <ProductView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onDescriptionChange={this.handleDescriptionChange}
        onImageChange={this.handleImageChange}
        onBrandChange={this.handleBrandChange}
        onCategoryChange={this.handleCategoryChange}
        onTypesChange={this.handleTypesChange}
        onMaterialsChange={this.handleMaterialsChange}
        onColoursChange={this.handleColoursChange}
        errors={errors}
        brands={brands}
        categories={categories}
        types={types}
        materials={materials}
        colours={colours}
        optionLoading={optionLoading}
        pictures={pictures}
      />
    );
  }
}

AddProduct.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,
  postError: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  createProduct: value => dispatch(products.create(value)),
  postError: value => dispatch(postError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
