import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductView from '../components/product_view';

import { products, postError } from '../../../redux/actions';
import * as API from '../../../lib/api';
import serverUrl from '../../../globals/api_server';
import { toOptionsList, toOptionsListWithImages } from '../../../lib/utils';

class EditProduct extends React.Component {
  state = {
    loading: true,
    brands: [],
    categories: [],
    types: [],
    materials: [],
    colours: [],
    errors: {},
    record: {
      id: null,
      name: '',
      name_eng: '',
      description: '',
      pictures: [],
      brand: null,
      category: null,
      types: [],
      materials: [],
      colours: [],
    },
  }

  async componentDidMount() {
    
    console.log('Component EditProduct mounted!');


    const { auth: { token }, fetchProduct, postError } = this.props;
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

    fetchProduct({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {    
    if (nextProps.products.current && nextProps.products.current.id !== prevState.record.id) {
      console.log('NEW EDIT CATEGORY PROPS: ', nextProps);
      return ({
        record: { ...nextProps.products.current, category: nextProps.products.current.category ? nextProps.products.current.category.id : null },
        loading: false,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history, setProduct } = this.props;

    // clear Redux state record of the current Material
    setProduct({ name: '', name_eng: '', description: '', id: -1, pictures: null, category: {id: null} });
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { record: { name, name_eng, description, pictures, brand, category } } = this.state;
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
    if (!brand) {
      errors = { ...errors, Brand: 'Brand should be selected' };
    }
    if (!category) {
      errors = { ...errors, Category: 'Category should be selected '};
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
    const { record } = this.state;

    console.log('UPDATE PRODUCT: ', record);

    record.pictures = record.pictures.map(picture => picture ? picture : 0);
    

    this.props.updateProduct({
      serverUrl,
      token,
      record,
    });

    this.handleClose();
  }

  handleNameChange = e => this.setState({ record: { ...this.state.record, name: e.target.value } });

  handleNameEngChange = e => this.setState({ record: { ...this.state.record, name_eng: e.target.value } });

  handleDescriptionChange = e => this.setState({ record: { ...this.state.record, description: e.target.value } });

  handleBrandChange = (e, data) => this.setState({ record: { ...this.state.record, brand: data.value } });

  handleCategoryChange = (e, data) => this.setState({ record: { ...this.state.record, category: data.value } });

  handleTypesChange = (e, data) => this.setState({ record: { ...this.state.record, types: data.value } });

  handleMaterialsChange = (e, data) => this.setState({ record: { ...this.state.record, materials: data.value } });

  handleColoursChange = (e, data) => this.setState({ record: { ...this.state.record, colours: data.value } });

  handleImageChange = (picture, index) => {
    const { record: { pictures }, record } = this.state;
    let newPictures;
    if (index >= pictures.length || index === -1) {
      newPictures = [...pictures, picture];
    } else {
      newPictures = [...pictures];
      newPictures[index] = picture;
    }
    this.setState({ record: { ...record, pictures: newPictures } });
  }

  render() {
    const { loading, errors, brands, categories, types, materials, colours, record } = this.state;
    // wait until all data loaded to the this.state fields related to brand
    // to avoid annoying flickering
    // TODO: use state.loading for this purposes
    if (record.name === '') return null;

    const optionLoading = {
      brand: brands.length === 0,
      category: categories.length === 0,
      types: types.length === 0,
      materials: materials.length === 0,
      colours: colours.length === 0,
    };

    return (
      <ProductView
        key={record.id}
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        optionLoading={optionLoading}
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
        header="Edit Product"
        product={record}
        brands={brands}
        categories={categories}
        types={types}
        materials={materials}
        colours={colours}
        pictures={record.pictures}
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
  postError: PropTypes.func.isRequired,
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
  postError: value => dispatch(postError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
