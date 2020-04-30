import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from '../components/app_content';
import Header from '../components/header';
import AddButton from '../components/add_button';
import ErrorMessage from '../containers/error_message';

import { products } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

import RecordsHolder from '../components/records_holder';

class Products extends React.Component {
  state = {}

  productFields = [
    {
      name: 'name',
      title: 'Name',
      Component: RecordsHolder.Text,
    },
    {
      name: 'name_eng',
      title: 'English name',
      Component: RecordsHolder.Text,
    },
    {
      name: record => (record.category.name),
      title: 'Category',
      Component: RecordsHolder.Text,
    }, 
  ];

  componentDidMount() {
    // in case Redux state has already record of products, just skip API call
    if (this.props.products.records.length > 0) return;

    const {
      fetchProducts,
      getInfo,
      auth: { token },
      products: { currentPage },
    } = this.props;

    fetchProducts({ serverUrl, token, page: currentPage });
    getInfo({ serverUrl, token });
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    const { fetchProducts, auth: { token } } = this.props;
    fetchProducts({ serverUrl, token, page: activePage });
  }

  handleProductDelete = (id) => {
    const { auth: { token }, destroyProduct } = this.props;
    destroyProduct({ serverUrl, token, id });
  }

  render() {
    const { products } = this.props;
    return (
      <AppContent>
        <Header title="Products">
          <AddButton
            title="product"
            to={{
              pathname: '/director/products/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            All (
            {products.available}
            )
            <Link to="/director/products/trash">
              Trash (
              {products.trash}
              )
            </Link>
          </div>
          {
            products.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={products.currentPage}
                  totalPages={products.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <RecordsHolder
            records={products.records}
            onDelete={this.handleProductDelete}
            fields={this.productFields}
            modelName="products"
          />
        </div>
      </AppContent>
    );
  }
}

Products.propTypes = {
  products: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  destroyProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    products: state.products,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchProducts: value => dispatch(products.fetchByPage(value)),
  getInfo: value => dispatch(products.getInfo(value)),
  destroyProduct: value => dispatch(products.destroy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
