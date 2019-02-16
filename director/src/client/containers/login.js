import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/login_form';

import { loginUser, deauthorizeUser } from '../../redux/actions';
import serverUrl from '../../globals/api_server';


class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    // clear auth infromation to re-login
    this.props.deathorizeUser();
  }

  handleEmailChange = e => this.setState({ email: e.target.value });

  handlePasswordChange = e => this.setState({ password: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.loginUser({
      serverUrl,
      email,
      password,
    });
  }

  render() {
    const { location, auth: { isAuthenticated } } = this.props;
    const { from } = location.state || { from: { pathname: '/director' } };

    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <LoginForm
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
  deathorizeUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  location: {
    state: null,
  },
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = dispatch => ({
  loginUser: value => dispatch(loginUser(value)),
  deathorizeUser: value => dispatch(deauthorizeUser(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
