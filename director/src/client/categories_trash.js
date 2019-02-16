import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';
import * as actions from '../redux/actions';
import serverUrl from '../globals/api_server';
import * as API from '../lib/api';

import CategoriesHolder from './components/categories_holder';

class CategoriesTrash extends React.Component {
  state = {
    records: [{
      id: 0,
      name: '',
      name_eng: '',
    }],
  }

  async componentDidMount() {
    console.log('Categories Trash mounted, load categories...');
    const {
      getInfo,
      auth: { token },
    } = this.props;

    getInfo({ serverUrl, token });

    try {
      const records = await API.categories.fetchTrash({ url: serverUrl, token });
      this.setState({ records });
    } catch (error) {
      console.log(`Cannot catch categories data from trash due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleCategoryDelete = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;
    // this.props.destroyCategory({ serverUrl, token, id });

    try {
      const response = await API.categories.destroy({ url: serverUrl, token, id });
      this.props.deleteCategory({});
      this.setState({
        records: records.filter(category => category.id !== id),
      });
    } catch (error) {
      console.log(`Cannot permanently delete category with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleCategoryRestore = async (id) => {
    console.log('Restore record: ', id);
    const { auth: { token } } = this.props;
    const { records } = this.state;
    const record = records.find(r => r.id === id);

    try {
      await API.categories.restore({ url: serverUrl, token, id });
      this.setState({
        records: records.filter(category => category.id !== id),
      });

      this.props.recoverCategory(record);
      
    } catch (error) {
      console.log(`Cannot restore category with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  render() {
    const { categories } = this.props;
    const { records } = this.state;
    return (
      <AppContent>
        <Header title="Categories Trash">
          <AddButton
            title="category"
            to={{
              pathname: '/director/categories/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            <Link to="/director/categories">
              All ({categories.available})
            </Link>
            Trash ({categories.trash})
          </div>
          {
            categories.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={categories.currentPage}
                  totalPages={categories.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <CategoriesHolder
            records={records}
            onDelete={this.handleCategoryDelete}
            onRestore={this.handleCategoryRestore}
            editable={false}
          />
        </div>
      </AppContent>
    );
  }
}

CategoriesTrash.propTypes = {
  getInfo: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  postError: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    categories: state.categories,
  }
);
const mapDispatchToProps = dispatch => ({
  getInfo: value => dispatch(actions.categories.getInfo(value)),
  recoverCategory: value => dispatch(actions.categories.recover(value)),
  postError: value => dispatch(actions.postError(value)),
  deleteCategory: value => dispatch(actions.categories.delete(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTrash);
