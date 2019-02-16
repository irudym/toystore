import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './routes/private_route';
import Director from './director';

import 'semantic-ui-css/semantic.min.css';

import Login from './client/containers/login';
import Logout from './client/logout';

class App extends Component {
  render() {
    const { auth: { isAuthenticated } } = this.props;
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/director" component={Director} isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);


export default connect(mapStateToProps, () => ({}))(App);
