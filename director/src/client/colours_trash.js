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
  getColoursInfo,
  postError,
  recoverColour,
  deleteColour,
} from '../redux/actions';
import serverUrl from '../globals/api_server';
import * as API from '../lib/api';

class ColoursTrash extends React.Component {
  state = {
    records: [],
  }

  colourFields = [
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
      name: 'hex',
      title: 'Color',
      Component: RecordsHolder.ColourBox,
    },
  ];

  async componentDidMount() {
    const {
      getInfo,
      auth: { token },
    } = this.props;

    getInfo({ serverUrl, token });
    try {
      const records = await API.colours.fetchTrash({ url: serverUrl, token });
      this.setState({ records });
    } catch (error) {
      console.log(`Cannot catch colours data from trash due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleColourDelete = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;

    try {
      const response = await API.colours.destroy({ url: serverUrl, token, id });
      this.props.deleteColour({});
      this.setState({
        records: records.filter(category => category.id !== id),
      });
    } catch (error) {
      console.log(`Cannot permanently delete colour with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  handleColourRestore = async (id) => {
    const { auth: { token } } = this.props;
    const { records } = this.state;

    const record = records.find(r => r.id === id);

    try {
      await API.colours.restore({ url: serverUrl, token, id });
      this.setState({
        records: records.filter(record => record.id !== id),
      });
      this.props.recoverColour(record);
    } catch (error) {
      console.log(`Cannot restore colour with id: ${id}, due to error: ${error.message} `);
      this.props.postError(error);
    }
  }

  render() {
    const { colours } = this.props;
    const { records } = this.state;
    return (
      <AppContent>
        <Header title="Colours Trash">
          <AddButton
            title="category"
            to={{
              pathname: '/director/colours/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            <Link to="/director/colours">
              All ({colours.available})
            </Link>
            Trash ({colours.trash})
          </div>
          {
            colours.pages > 1
              ? (
                <Pagination
                  defaultActivePage={1}
                  activePage={colours.currentPage}
                  totalPages={colours.pages}
                  onPageChange={this.handlePageChange}
                />
              )
              : null
          }
          <RecordsHolder
            records={records}
            onDelete={this.handleColourDelete}
            onRestore={this.handleColourRestore}
            fields={this.colourFields}
            modelName="colours"
          />
        </div>
      </AppContent>
    );
  }
}

ColoursTrash.propTypes = {
  colours: PropTypes.object.isRequired,
  getInfo: PropTypes.func.isRequired,
  postError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteColour: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    colours: state.colours,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  getInfo: value => dispatch(getColoursInfo(value)),
  postError: value => dispatch(postError(value)),
  deleteColour: value => dispatch(deleteColour(value)),
  recoverColour: value => dispatch(recoverColour(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColoursTrash);
