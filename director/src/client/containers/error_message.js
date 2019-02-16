import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import ErrorMessage from '../components/error_message';
import { resetError } from '../../redux/actions';

class ErrorMessageClass extends React.Component {
  handleClose = () => {
    this.props.resetError("test");
  }

  render() {
    const { error } = this.props;
    if (!error) return null;
    let showLogout = false;
    if (error.match(/Signature has expired/)) {
      showLogout = true;
    }
    return (
      <ErrorMessage message={error} onClose={this.handleClose} showLogout={showLogout} />
    );
  }
}

ErrorMessageClass.propTypes = {
  error: PropType.string.isRequired,
  resetError: PropType.func.isRequired,
};

const mapStateToProps = state => (
  {
    error: state.currentError,
  }
);

const mapDispatchToProps = dispatch => ({
  resetError: value => dispatch(resetError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageClass);
