import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from '../components/app_content';
import Header from '../components/header';
import ErrorMessage from '../containers/error_message';
import AddItem from './containers/add_item';

// import { products } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

import RecordsHolder from '../components/records_holder';

class Stock extends React.Component {
  state = {
    brands: [],
  }

  stockFields = [
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
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    // const { fetchProducts, auth: { token } } = this.props;
    // fetchProducts({ serverUrl, token, page: activePage });
  }

  handleProductDelete = (id) => {
    // const { auth: { token }, destroyProduct } = this.props;
    // destroyProduct({ serverUrl, token, id });
  }

  render() {
    const stock = {
      available: 0,
      trash: 0,
      pages: 1,
    };
    return (
      <AppContent>
        <Header title="Stock">
          <ErrorMessage />
          <AddItem />
        </Header>
        <div>
          <div>
            All (
            {stock.available}
            )
            <Link to="/director/stock/trash">
              Trash (
              {stock.trash}
              )
            </Link>
          </div>
          {
            stock.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={stock.currentPage}
                  totalPages={stock.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <RecordsHolder
            records={[]}
            onDelete={this.handleItemDelete}
            fields={this.stockFields}
            modelName="stock"
          />
        </div>
      </AppContent>
    );
  }
}

Stock.propTypes = {
  stock: PropTypes.object.isRequired,
  // fetchProducts: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  // destroyProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    // products: state.products,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  // fetchProducts: value => dispatch(products.fetchByPage(value)),
  // getInfo: value => dispatch(products.getInfo(value)),
  // destroyProduct: value => dispatch(products.destroy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
