import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
  Dropdown,
  Label,
} from 'semantic-ui-react';

// import ModalView from '../../components/views/modal_view';
import ColourDropdown from '../../components/colour_dropdown';
import ImagePickerGroup from '../../containers/image_picker_group';

const labelStyle = error => ({
  fontSize: '.92857143em',
  fontWeight: 700,
  color: error ? '#9f3a38' : 'black',
  padding: 0,
  margin: '0 0 .28571429rem 0',
});


const ProductForm = ({
  onNameChange,
  onNameEngChange,
  onDescriptionChange,
  errors,
  product,
  brands,
  onBrandChange,
  optionLoading,
  categories,
  onCategoryChange,
  types,
  onTypesChange,
  materials,
  onMaterialsChange,
  colours,
  onColoursChange,
  onImageChange,
  pictures,
}) => (
  <Form>
    <Form.Input
      label="Name"
      placeholder="Type name..."
      onChange={onNameChange}
      error={errors.Name !== undefined}
      value={product.name}
    />
    <Form.Input
      label="English Name"
      placeholder="Type name in english..."
      onChange={onNameEngChange}
      error={errors.NameEng !== undefined}
      value={product.name_eng}
    />
    <Form.TextArea
      label="Description"
      placeholder="Description of the product..."
      onChange={onDescriptionChange}
      error={errors.Description !== undefined}
      value={product.description}
    />
    <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
      <div style={labelStyle(errors.Brand !== undefined)}>Brand</div>
      <Dropdown
        placeholder="Select brand"
        fluid
        search
        selection
        options={brands}
        onChange={onBrandChange}
        defaultValue={product.brand}
        loading={optionLoading.brand}
        error={errors.Brand !== undefined}
      />
    </Form.Group>
    <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
      <div style={labelStyle(errors.Category !== undefined)}>Category</div>
      <Dropdown
        placeholder="Select category"
        fluid
        search
        selection
        options={categories}
        onChange={onCategoryChange}
        defaultValue={product.category}
        loading={optionLoading.category}
        error={errors.Category !== undefined}
      />
    </Form.Group>
    <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
      <div style={labelStyle(errors.Types !== undefined)}>Types</div>
      <Dropdown
        placeholder="Select category"
        fluid
        search
        selection
        multiple
        options={types}
        onChange={onTypesChange}
        defaultValue={product.types}
        loading={optionLoading.types}
      />
    </Form.Group>
    <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
      <div style={labelStyle(errors.Materials !== undefined)}>Materials</div>
      <Dropdown
        placeholder="Select category"
        fluid
        search
        selection
        multiple
        options={materials}
        onChange={onMaterialsChange}
        defaultValue={product.materials}
        loading={optionLoading.materials}
      />
    </Form.Group>
    <ColourDropdown defaultValue={product.colours} loading={optionLoading.colours} options={colours} onChange={onColoursChange} error={errors.Colours !== undefined} />
    <ImagePickerGroup onImageChange={onImageChange} images={pictures} error={errors.Pictures !== undefined} />
  </Form>
);

ProductForm.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onBrandChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onColoursChange: PropTypes.func.isRequired,
  onTypesChange: PropTypes.func.isRequired,
  onMaterialsChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  optionLoading: PropTypes.object.isRequired,
  brands: PropTypes.arrayOf(PropTypes.object).isRequired,
  colours: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageChange: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductForm;
