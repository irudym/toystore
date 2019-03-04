import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import AppContent from './components/app_content';
import Header from './components/header';
import AddButton from './components/add_button';
import ErrorMessage from './containers/error_message';

import { colours } from '../redux/actions';
import serverUrl from '../globals/api_server';

import RecordsHolder from './components/records_holder';

class Colours extends React.Component {
  state = {}

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

  componentDidMount() {
    // in case Redux state has already record of categories, just skip API call
    if (this.props.colours.records.length > 0) return;

    const {
      fetchColours,
      getInfo,
      auth: { token },
      colours: { currentPage },
    } = this.props;

    fetchColours({ serverUrl, token, page: currentPage });
    getInfo({ serverUrl, token });
  }

  handlePageChange = (e, { activePage }) => {
    // load page from API
    const { fetchColours, auth: { token } } = this.props;
    fetchColours({ serverUrl, token, page: activePage });
  }

  handleColourDelete = (id) => {
    const { auth: { token } } = this.props;
    this.props.destroyColour({ serverUrl, token, id });
  }

  render() { 
    const { colours } = this.props;
    return (
      <AppContent>
        <Header title="Colours">
          <AddButton
            title="colour"
            to={{
              pathname: '/director/colours/add',
              state: { modal: true },
            }}
          />
          <ErrorMessage />
        </Header>
        <div>
          <div>
            All (
            {colours.available}
            )
            <Link to="/director/colours/trash">
              Trash (
              {colours.trash}
              )
            </Link>
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
            records={colours.records}
            onDelete={this.handleColourDelete}
            fields={this.colourFields}
            modelName="colours"
          />
        </div>
      </AppContent>
    );
  }
}

Colours.propTypes = {
  colours: PropTypes.object.isRequired,
  fetchColours: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  destroyColour: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    colours: state.colours,
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchColours: value => dispatch(colours.fetchByPage(value)),
  getInfo: value => dispatch(colours.getInfo(value)),
  destroyColour: value => dispatch(colours.destroy(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Colours);
