import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
  Dropdown,
  Label,
} from 'semantic-ui-react';

import ModalView from '../../components/views/modal_view';
import ColourDropdown from '../../components/colour_dropdown';


// TODO: Add product card preview as second column
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
    <Form.Group inline>
      <Label>Brand</Label>
      <Dropdown
        placeholder="Select brand"
        fluid
        search
        selection
        options={brands}
        onChange={onBrandChange}
        defaultValue={product.brand}
        loading={optionLoading.brand}
      />
    </Form.Group>
    <Form.Group inline>
      <Label>Category</Label>
      <Dropdown
        placeholder="Select category"
        fluid
        search
        selection
        options={categories}
        onChange={onCategoryChange}
        defaultValue={product.category}
        loading={optionLoading.category}
      />
    </Form.Group>
    <Form.Group inline>
      <Label>Types</Label>
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
    <Form.Group inline>
      <Label>Materials</Label>
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
    <ColourDropdown loading={optionLoading.colours} options={colours} onChange={onColoursChange} />
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
  product: PropTypes.object,
  optionLoading: PropTypes.object.isRequired,
  brands: PropTypes.arrayOf(PropTypes.object).isRequired,
  colours: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ProductForm.defaultProps = {
  product: {},
};

export default ProductForm;
