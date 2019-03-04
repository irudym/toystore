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
import { types, postError } from '../redux/actions';
import serverUrl from '../globals/api_server';
import * as API from '../lib/api';

class TypesTrash extends React.Component {
  state = {
    records: [],
  }

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

  async componentDidMount() {
    const {
      getInfo,
      auth: { token },
    } = this.props;

    getInfo({ serverUrl, token });
    try {
      const records = await API.types.fetchTrash({ url: serverUrl, token });
      this.setState({ records });
    } catch (error) {
      console.log(`Cannot catch types data from trash due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleTypeDelete = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;

    try {
      const response = await API.types.destroy({ url: serverUrl, token, id });
      this.props.deleteType({});
      this.setState({
        records: records.filter(category => category.id !== id),
      });
    } catch (error) {
      console.log(`Cannot permanently delete material with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleTypeRestore = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;

    const record = records.find(r => r.id === id);

    try {
      await API.types.restore({ url: serverUrl, token, id });
      this.setState({
        records: records.filter(record => record.id !== id),
      });
      this.props.recoverType(record);
    } catch (error) {
      console.log(`Cannot restore material with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  render() {
    const { types } = this.props;
    const { records } = this.state;
    return (
      <AppContent>
        <Header title="Types Trash">
          <AddButton
            title="material"
            to={{
              pathname: '/director/types/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            <Link to="/director/types">
              All ({types.available})
            </Link>
            Trash ({types.trash})
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
            records={records}
            onDelete={this.handleTypeDelete}
            onRestore={this.handleTypeRestore}
            fields={this.materialFields}
            modelName="types"
          />
        </div>
      </AppContent>
    );
  }
}

TypesTrash.propTypes = {
  types: PropTypes.object.isRequired,
  getInfo: PropTypes.func.isRequired,
  postError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteType: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    types: state.types,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  getInfo: value => dispatch(types.getInfo(value)),
  postError: value => dispatch(postError(value)),
  deleteType: value => dispatch(types.delete(value)),
  recoverType: value => dispatch(types.recover(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypesTrash);
