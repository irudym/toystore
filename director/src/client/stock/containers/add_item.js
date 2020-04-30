import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddItemComponent from '../components/add_item';
import * as API from '../../../lib/api';
import { postError } from '../../../redux/actions';
import serverUrl from '../../../globals/api_server';
import { toOptionsList, toOptionsListWithImages } from '../../../lib/utils';


class AddItem extends React.Component {
  state = {
    brands: [],
    categories: [],
    products: [],
    errors: {},
  }

  async componentDidMount() {
    const {
      auth: { token },
      postError,
    } = this.props;

    // fetch brands
    try {
      const brands = await API.brands.fetch({ url: serverUrl, token });
      // add all options to the list
      brands.unshift({ id: -1, name: 'All', picture: '' });
      this.setState({ brands: toOptionsListWithImages(brands) });
    } catch (error) {
      console.log(`Cannot catch brands data from trash due to error: ${error.message} `);
      postError(error);
    }

    // fetch categories
    try {
      const categories = await API.categories.fetch({ url: serverUrl, token });
      categories.unshift({ id: -1, name: 'All' });
      this.setState({ categories: toOptionsList(categories) });
    } catch (error) {
      console.log(`Cannot catch categories data from trash due to error: ${error.message} `);
      postError(error);
    }
  }

  handleBrandChange = async (e, data) => {
    // get items for particular brand_id
  }

  handleProductSearchChange = async (e, data) => {
    const {
      auth: { token },
      postError,
    } = this.props;

    console.log('SEARCH: ', data.searchQuery);
    try {
      const products = await API.products.search({ url: serverUrl, token, name: data.searchQuery });
      console.log('Set state to ', products);

      this.setState({ products: toOptionsList(products) });
    } catch (error) {
      console.log(`Cannot search products by query: ${data.searchQuery} due to error: ${error.message} `);
      postError(error);
    }
  }

  handleShowAll = (e) => {

  }

  render() {
    const { brands, errors, products, categories } = this.state;
    const optionLoading = {
      brand: brands.length === 0,
    };

    return (
      <AddItemComponent
        brands={brands}
        categories={categories}
        products={products}
        errors={errors}
        optionLoading={optionLoading}
        onProductSearchChange={this.handleProductSearchChange}
        onShowAll={this.handleShowAll}
      />
    );
  }
}

AddItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postError: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  // fetchProducts: value => dispatch(products.fetchByPage(value)),
  // getInfo: value => dispatch(products.getInfo(value)),
  // destroyProduct: value => dispatch(products.destroy(value)),
  postError: value => dispatch(postError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
