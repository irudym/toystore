import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';
import { categories } from '../redux/actions';
import serverUrl from '../globals/api_server';

import CategoriesHolder from './components/categories_holder';

class Categories extends React.Component {
  state = {}

  componentDidMount() {
    console.log('Categories mounted, load categories...');
    // in case Redux state has already record of categories, just skip API call
    if (this.props.categories.records.length > 0) return;

    const {
      fetchCategories,
      getInfo,
      auth: { token },
      categories: { currentPage },
    } = this.props;

    fetchCategories({ serverUrl, token, page: currentPage });
    getInfo({ serverUrl, token });
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    const { fetchCategories, auth: { token } } = this.props;
    fetchCategories({ serverUrl, token, page: activePage });
  }

  handleCategoryDelete = (id) => {
    const { auth: { token } } = this.props;
    this.props.destroyCategory({ serverUrl, token, id });
  }

  render() {
    const { categories } = this.props;
    return (
      <AppContent>
        <Header title="Categories">
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
            All ({categories.available})
            <Link to="/director/categories/trash">
              Trash ({categories.trash})
            </Link>
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
            records={categories.records}
            onDelete={this.handleCategoryDelete}
          />
        </div>
      </AppContent>
    );
  }
}

Categories.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  destroyCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    categories: state.categories,
  }
);
const mapDispatchToProps = dispatch => ({
  fetchCategories: value => dispatch(categories.fetchByPage(value)),
  getInfo: value => dispatch(categories.getInfo(value)),
  destroyCategory: value => dispatch(categories.destroy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
