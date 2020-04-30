import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Message,
  Grid,
} from 'semantic-ui-react';

import ModalView from '../../components/views/modal_view';
import ProductForm from './product_form';
import ProductCard from './product_card';


// TODO: Add product card preview as second column
const ProductView = ({
  onClose,
  onSubmit,
  onNameChange,
  onNameEngChange,
  onDescriptionChange,
  loading,
  errors,
  header,
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
  pictures,
  onImageChange,
}) => (
  <ModalView onClose={onClose} header={header} loading={loading}>
    <ModalView.Content>
      {
        Object.keys(errors).length !== 0
          ? (
            <Message
              error
              header="There are some errors in your data"
              list={Object.values(errors)}
            />
          )
          : null
      }
      <Grid columns={2}>
        <Grid.Column>
          <ProductForm
            onNameChange={onNameChange}
            onNameEngChange={onNameEngChange}
            onDescriptionChange={onDescriptionChange}
            errors={errors}
            product={product}
            brands={brands}
            onBrandChange={onBrandChange}
            optionLoading={optionLoading}
            categories={categories}
            onCategoryChange={onCategoryChange}
            types={types}
            onTypesChange={onTypesChange}
            materials={materials}
            onMaterialsChange={onMaterialsChange}
            colours={colours}
            onColoursChange={onColoursChange}
            onImageChange={onImageChange}
            pictures={pictures}
          />
        </Grid.Column>
        <Grid.Column>
          <ProductCard
            product={product}
            pictures={pictures}
          />
        </Grid.Column>
      </Grid>
    </ModalView.Content>
    <ModalView.Actions>
      <Button onClick={onSubmit}> Ok </Button>
      <Button onClick={onClose}> Cancel </Button>
    </ModalView.Actions>
  </ModalView>
);

ProductView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNameEngChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onColoursChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  header: PropTypes.string,
  product: PropTypes.object,
  onBrandChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onTypesChange: PropTypes.func.isRequired,
  onMaterialsChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string),
  brands: PropTypes.arrayOf(PropTypes.object).isRequired,
  colours: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionLoading: PropTypes.object.isRequired,
};

ProductView.defaultProps = {
  header: 'Add a Product',
  product: {},
  pictures: [],
};

export default ProductView;
