import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';
import RecordsHolder from './components/records_holder';
import { brands, postError } from '../redux/actions';
import serverUrl from '../globals/api_server';
import * as API from '../lib/api';

class BrandsTrash extends React.Component {
  state = {
    records: [],
  }

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

  async componentDidMount() {
    const {
      getInfo,
      auth: { token },
      postError,
    } = this.props;

    getInfo({ serverUrl, token });
    try {
      const records = await API.brands.fetchTrash({ url: serverUrl, token });
      this.setState({ records });
    } catch (error) {
      console.log(`Cannot catch brands data from trash due to error: ${error.message} `);
      postError(error);
    }
  }

  handleBrandDelete = async (id) => {
    const { auth: { token }, deleteBrand, postError } = this.props;
    const { records } = this.state;

    try {
      const response = await API.brands.destroy({ url: serverUrl, token, id });
      deleteBrand({});
      this.setState({
        records: records.filter(brand => brand.id !== id),
      });
    } catch (error) {
      console.log(`Cannot permanently delete brand with id: ${id}, due to error: ${error.message} `);
      postError(error);
    }
  }

  handleBrandRestore = async (id) => {
    const { auth: { token }, recoverBrand, postError } = this.props;
    const { records } = this.state;

    const record = records.find(r => r.id === id);

    try {
      await API.brands.restore({ url: serverUrl, token, id });
      this.setState({
        records: records.filter(brand => brand.id !== id),
      });
      recoverBrand(record);
    } catch (error) {
      console.log(`Cannot restore brand with id: ${id}, due to error: ${error.message} `);
      postError(error);
    }
  }

  render() {
    const { brands } = this.props;
    const { records } = this.state;
    return (
      <AppContent>
        <Header title="Brands Trash">
          <AddButton
            title="brand"
            to={{
              pathname: '/director/brands/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            <Link to="/director/brands">
              All ({brands.available})
            </Link>
            Trash ({brands.trash})
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
            records={records}
            onDelete={this.handleBrandDelete}
            onRestore={this.handleBrandRestore}
            fields={this.brandFields}
            modelName="brands"
          />
        </div>
      </AppContent>
    );
  }
}

BrandsTrash.propTypes = {
  brands: PropTypes.object.isRequired,
  getInfo: PropTypes.func.isRequired,
  postError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  recoverBrand: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    brands: state.brands,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  getInfo: value => dispatch(brands.getInfo(value)),
  postError: value => dispatch(postError(value)),
  deleteBrand: value => dispatch(brands.delete(value)),
  recoverBrand: value => dispatch(brands.recover(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsTrash);
