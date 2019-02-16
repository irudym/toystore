import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';

import { fetchMaterialsByPage, getMaterialsInfo, destroyMaterial } from '../redux/actions';
import serverUrl from '../globals/api_server';

import RecordsHolder from './components/records_holder';

class Materials extends React.Component {
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
    // in case Redux state has already record of categories, just skip API call
    if (this.props.materials.records.length > 0) return;

    const {
      fetchMaterials,
      getInfo,
      auth: { token },
      materials: { currentPage },
    } = this.props;

    fetchMaterials({ serverUrl, token, page: currentPage });
    getInfo({ serverUrl, token });
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    const { fetchMaterials, auth: { token } } = this.props;
    fetchMaterials({ serverUrl, token, page: activePage });
  }

  handleMaterialDelete = (id) => {
    const { auth: { token } } = this.props;
    this.props.destroyMaterial({ serverUrl, token, id });
  }

  render() {
    const { materials } = this.props;
    return (
      <AppContent>
        <Header title="Materials">
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
            All (
            {materials.available}
            )
            <Link to="/director/materials/trash">
              Trash (
              {materials.trash}
              )
            </Link>
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
            records={materials.records}
            onDelete={this.handleMaterialDelete}
            fields={this.materialFields}
            modelName="materials"
          />
        </div>
      </AppContent>
    );
  }
}

Materials.propTypes = {
  materials: PropTypes.object.isRequired,
  fetchMaterials: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  destroyMaterial: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    materials: state.materials,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchMaterials: value => dispatch(fetchMaterialsByPage(value)),
  getInfo: value => dispatch(getMaterialsInfo(value)),
  destroyMaterial: value => dispatch(destroyMaterial(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Materials);
