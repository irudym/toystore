import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from '../components/app_content';
import Header from '../components/header';
import AddButton from '../components/add_button';
import ErrorMessage from '../containers/error_message';
import RecordsHolder from '../components/records_holder';
import { products, postError } from '../../redux/actions';
import serverUrl from '../../globals/api_server';
import * as API from '../../lib/api';

class ProductsTrash extends React.Component {
  state = {
    records: [],
  }

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
  ];

  async componentDidMount() {
    const {
      getInfo,
      auth: { token },
      postError,
    } = this.props;

    getInfo({ serverUrl, token });
    try {
      const records = await API.products.fetchTrash({ url: serverUrl, token });
      this.setState({ records });
    } catch (error) {
      console.log(`Cannot catch products data from trash due to error: ${error.message} `);
      postError(error);
    }
  }

  handleProductDelete = async (id) => {
    const { auth: { token }, deleteProduct, postError } = this.props;
    const { records } = this.state;

    try {
      const response = await API.products.destroy({ url: serverUrl, token, id });
      deleteProduct({});
      this.setState({
        records: records.filter(product => product.id !== id),
      });
    } catch (error) {
      console.log(`Cannot permanently delete product with id: ${id}, due to error: ${error.message} `);
      postError(error);
    }
  }

  handleProductRestore = async (id) => {
    const { auth: { token }, recoverProduct, postError } = this.props;
    const { records } = this.state;

    const record = records.find(r => r.id === id);

    try {
      await API.products.restore({ url: serverUrl, token, id });
      this.setState({
        records: records.filter(product => product.id !== id),
      });
      recoverProduct(record);
    } catch (error) {
      console.log(`Cannot restore product with id: ${id}, due to error: ${error.message} `);
      postError(error);
    }
  }

  render() {
    const { products } = this.props;
    const { records } = this.state;
    return (
      <AppContent>
        <Header title="Products Trash">
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
            <Link to="/director/products">
              All ({products.available})
            </Link>
            Trash ({products.trash})
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
            records={records}
            onDelete={this.handleProductDelete}
            onRestore={this.handleProductRestore}
            fields={this.productFields}
            modelName="products"
          />
        </div>
      </AppContent>
    );
  }
}

ProductsTrash.propTypes = {
  products: PropTypes.object.isRequired,
  getInfo: PropTypes.func.isRequired,
  postError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  recoverProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    products: state.products,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  getInfo: value => dispatch(products.getInfo(value)),
  postError: value => dispatch(postError(value)),
  deleteProduct: value => dispatch(products.delete(value)),
  recoverProduct: value => dispatch(products.recover(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTrash);
