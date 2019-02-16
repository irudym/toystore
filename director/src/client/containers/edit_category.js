import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryView from '../components/views/category_view';

import { categories } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class EditCategory extends React.Component {
  state = {
    loading: false,
    name: '',
    name_eng: '',
    errors: {},
  }

  componentDidMount() {
    const { auth: { token }, fetchCategory } = this.props;
    // console.log('Edit categories dialog mounted: ', this.props.match.params.id);

    fetchCategory({ serverUrl, token, id: this.props.match.params.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('NEW EDIT CATEGORY PROPS: ', nextProps);
    if (nextProps.categories.current && nextProps.categories.current.id !== prevState.id) {
      return ({
        id: nextProps.categories.current.id,
        name: nextProps.categories.current.name,
        name_eng: nextProps.categories.current.name_eng,
      });
    }
    return null;
  }

  handleClose = () => {
    // e.stopPropagation();
    const { history } = this.props;
    this.props.setCategory({ name: '', name_eng: '', id: -1 });
    history.goBack();
  }

  validation = () => {
    let errors = {};
    const { name, name_eng } = this.state;
    if (name.length === 0 || !name.trim()) {
      errors = { Name: 'Name field cannot be blank' };
    }
    if (name_eng.length === 0 || !name_eng.trim()) {
      errors = { ...errors, NameEng: 'Name in english cannot be blank' };
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
    const { auth: { token }, updateCategory } = this.props;
    const { id, name, name_eng } = this.state;

    console.log('EditCategory: Submit: ', this.state);
    updateCategory({
      serverUrl,
      token,
      record: {
        id,
        name,
        name_eng,
      },
    });

    this.handleClose();
  }

  handleNameChange = e => this.setState({ name: e.target.value });

  handleNameEngChange = e => this.setState({ name_eng: e.target.value });

  render() {
    const { loading, errors } = this.state;
    // wait until all data loaded to the this.state fields related to category
    // to avoid annoying flickering
    // TODO: use state.loading for this purposes
    const { name, name_eng } = this.state;
    if (name === '' || name_eng === '') return null;

    return (
      <CategoryView
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        loading={loading}
        onNameChange={this.handleNameChange}
        onNameEngChange={this.handleNameEngChange}
        errors={errors}
        header="Edit Category"
        category={this.state}
      />
    );
  }
}

EditCategory.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchCategory: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    categories: state.categories,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchCategory: value => dispatch(categories.fetchRecord(value)),
  setCategory: value => dispatch(categories.setRecord(value)),
  updateCategory: value => dispatch(categories.update(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
