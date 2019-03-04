import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColourView from '../components/views/colour_view';
import { colours } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class EditColour extends React.Component {
  state = {
    id: null,
    name: '',
    nameEng: '',
    hex: '',
    errors: {},
  }

  componentDidMount() {
    const { auth: { token }, fetch } = this.props;
    fetch({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('NEW EDIT COLOURS PROPS: ', nextProps);
    if (nextProps.colours.current && nextProps.colours.current.id !== prevState.id) {
      return ({
        id: nextProps.colours.current.id,
        name: nextProps.colours.current.name,
        nameEng: nextProps.colours.current.name_eng,
        hex: nextProps.colours.current.hex,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history, set } = this.props;
    // clear current color
    set({
      id: null,
      name: '',
      nameEng: '',
      hex: '',
    });
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, nameEng, hex } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { Name: 'Name field cannot be blank' };
    }
    if (nameEng.length === 0 || !nameEng.trim()) {
      errors = { ...errors, NameEng: 'Name in english cannot be blank' };
    }
    if (hex.length === 0 || !hex.trim()) {
      errors = { ...errors, hex: 'HEX code cannot be blank' };
    }
    return errors;
  }

  handleSubmit = () => {
    const errors = this.validation();
    if (Object.keys(errors).length !== 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });
    const { auth: { token }, update } = this.props;
    const { id, name, nameEng, hex } = this.state;

    console.log('EditCategory: Submit: ', this.state);
    update({
      serverUrl,
      token,
      record: {
        id,
        name,
        name_eng: nameEng,
        hex,
      },
    });

    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ nameEng: e.target.value });

  handleHexChange = e => this.setState({ hex: e.target.value });

  render() {
    const { loading, errors } = this.state;
    // wait until all data loaded to the this.state fields related to category
    // to avoid annoing flikering
    // TODO: use state.loading for this purposes
    if ( this.state.name === '' || this.state.nameEng === '') return null; 
    return (
      <ColourView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        onHexChange={this.handleHexChange}
        errors={errors}
        header="Edit Colour"
        colour={this.state}
      />
    );
  }
}

EditColour.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    colours: state.colours,
  }
);

const mapDispatchToProps = dispatch => ({
  fetch: value => dispatch(colours.fetchRecord(value)),
  set: value => dispatch(colours.setRecord(value)),
  update: value => dispatch(colours.update(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditColour);
