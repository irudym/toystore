import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { deauthorizeUser } from '../redux/actions';

class Logout extends React.Component {
  state = {}

  componentDidMount() {
    // clear auth infromation to re-login
    this.props.deauthorizeUser();
  }

  render() {
    return (
      <Redirect to="/login" />
    );
  }
}

Logout.propTypes = {
  auth: PropTypes.object.isRequired,
  deauthorizeUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  deauthorizeUser: value => dispatch(deauthorizeUser(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
