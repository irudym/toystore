import React from 'react';
import PropTypes from 'prop-types';

import ImagePickerComponent from '../components/image_picker';


class ImagePicker extends React.Component {
  state = {
    image: null,
    loading: false,
    ref: null,
  }

  static propTypes = {
    onImageChange: PropTypes.func.isRequired,
    image: PropTypes.string,
    id: PropTypes.number,
  }

  static defaultProps = {
    image: null,
    id: -100,
  }

  componentDidMount() {
    this.setState({ image: this.props.image });
  }

  handleFileChange = (event) => {
    const { target: { files } } = event;
    const { onImageChange } = this.props;

    if (files && files[0]) {
      let reader = new FileReader();

      reader.onloadstart = () => this.setState({ loading: true });

      reader.onload = (event) => {
        const { target: { result } } = event;

        this.setState({
          image: result,
          loading: false,
        });
        onImageChange(result);
      };

      reader.readAsDataURL(files[0]);
    }
  }

  handleImageDelete = () => {
    const { onImageChange } = this.props;
    const { ref } = this.state;
    ref.value = '';
    this.setState({ image: null });
    onImageChange(null);
  }

  handleSetRef = (ref) => {
    this.setState({ ref });
  }

  render() {
    const { image, loading } = this.state;
    const { id } = this.props;
    return (
      <ImagePickerComponent
        onFileChange={this.handleFileChange}
        onDelete={this.handleImageDelete}
        image={image}
        loading={loading}
        setRef={this.handleSetRef}
        id={id}
      />
    );
  }
}

export default ImagePicker;
