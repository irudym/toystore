import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';

import { brands } from '../redux/actions';
import serverUrl from '../globals/api_server';

import RecordsHolder from './components/records_holder';

class Brands extends React.Component {
  state = {}

  brandFields = [
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

  componentDidMount() {
    // in case Redux state has already record of categories, just skip API call
    if (this.props.brands.records.length > 0) return;

    const {
      fetchBrands,
      getInfo,
      auth: { token },
      brands: { currentPage },
    } = this.props;

    fetchBrands({ serverUrl, token, page: currentPage });
    getInfo({ serverUrl, token });
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    const { fetchBrands, auth: { token } } = this.props;
    fetchBrands({ serverUrl, token, page: activePage });
  }

  handleBrandDelete = (id) => {
    const { auth: { token }, destroyBrand } = this.props;
    destroyBrand({ serverUrl, token, id });
  }

  render() {
    const { brands } = this.props;
    return (
      <AppContent>
        <Header title="Brands">
          <AddButton
            title="brands"
            to={{
              pathname: '/director/brands/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            All (
            {brands.available}
            )
            <Link to="/director/brands/trash">
              Trash (
              {brands.trash}
              )
            </Link>
          </div>
          {
            brands.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={brands.currentPage}
                  totalPages={brands.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <RecordsHolder
            records={brands.records}
            onDelete={this.handleBrandDelete}
            fields={this.brandFields}
            modelName="brands"
          />
        </div>
      </AppContent>
    );
  }
}

Brands.propTypes = {
  brands: PropTypes.object.isRequired,
  fetchBrands: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  destroyBrand: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    brands: state.brands,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchBrands: value => dispatch(brands.fetchByPage(value)),
  getInfo: value => dispatch(brands.getInfo(value)),
  destroyBrand: value => dispatch(brands.destroy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
