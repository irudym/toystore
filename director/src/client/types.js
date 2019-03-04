import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';
import { types } from '../redux/actions';
import serverUrl from '../globals/api_server';

import RecordsHolder from './components/records_holder';

class Types extends React.Component {
  state = {}

  materialFields = [
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
    console.log('Types mounted, load types...');
    // in case Redux state has already record of types, just skip API call
    if (this.props.types.records.length > 0) return;

    const {
      fetchTypes,
      getInfo,
      auth: { token },
      types: { currentPage },
    } = this.props;

    fetchTypes({ serverUrl, token, page: currentPage });
    getInfo({ serverUrl, token });
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    const { fetchTypes, auth: { token } } = this.props;
    fetchTypes({ serverUrl, token, page: activePage });
  }

  handleTypeDelete = (id) => {
    const { auth: { token } } = this.props;
    this.props.destroyType({ serverUrl, token, id });
  }

  render() {
    const { types } = this.props;
    return (
      <AppContent>
        <Header title="Types">
          <AddButton
            title="type"
            to={{
              pathname: '/director/types/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            All ({types.available})
            <Link to="/director/types/trash">
              Trash ({types.trash})
            </Link>
          </div>
          {
            types.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={types.currentPage}
                  totalPages={types.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <RecordsHolder
            records={types.records}
            onDelete={this.handleTypeDelete}
            fields={this.materialFields}
            modelName="types"
          />
        </div>
      </AppContent>
    );
  }
}

Types.propTypes = {
  fetchTypes: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  destroyType: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    types: state.types,
  }
);
const mapDispatchToProps = dispatch => ({
  fetchTypes: value => dispatch(types.fetchByPage(value)),
  getInfo: value => dispatch(types.getInfo(value)),
  destroyType: value => dispatch(types.destroy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Types);
