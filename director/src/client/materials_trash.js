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
import {
  getMaterialsInfo,
  postError,
  recoverMaterial,
  deleteMaterial,
} from '../redux/actions';
import serverUrl from '../globals/api_server';
import * as API from '../lib/api';

class MaterialsTrash extends React.Component {
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
      const records = await API.materials.fetchTrash({ url: serverUrl, token });
      this.setState({ records });
    } catch (error) {
      console.log(`Cannot catch materials data from trash due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleMaterialDelete = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;

    try {
      const response = await API.materials.destroy({ url: serverUrl, token, id });
      this.props.deleteMaterial({});
      this.setState({
        records: records.filter(category => category.id !== id),
      });
    } catch (error) {
      console.log(`Cannot permanently delete material with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleMaterialRestore = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;

    const record = records.find(r => r.id === id);

    try {
      await API.materials.restore({ url: serverUrl, token, id });
      this.setState({
        records: records.filter(record => record.id !== id),
      });
      this.props.recoverMaterial(record);
    } catch (error) {
      console.log(`Cannot restore material with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  render() {
    const { materials } = this.props;
    const { records } = this.state;
    return (
      <AppContent>
        <Header title="Materials Trash">
          <AddButton
            title="material"
            to={{
              pathname: '/director/materials/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            <Link to="/director/materials">
              All ({materials.available})
            </Link>
            Trash ({materials.trash})
          </div>
          {
            materials.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={materials.currentPage}
                  totalPages={materials.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <RecordsHolder
            records={records}
            onDelete={this.handleMaterialDelete}
            onRestore={this.handleMaterialRestore}
            fields={this.materialFields}
            modelName="materials"
          />
        </div>
      </AppContent>
    );
  }
}

MaterialsTrash.propTypes = {
  materials: PropTypes.object.isRequired,
  getInfo: PropTypes.func.isRequired,
  postError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    materials: state.materials,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  getInfo: value => dispatch(getMaterialsInfo(value)),
  postError: value => dispatch(postError(value)),
  deleteMaterial: value => dispatch(deleteMaterial(value)),
  recoverMaterial: value => dispatch(recoverMaterial(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsTrash);
