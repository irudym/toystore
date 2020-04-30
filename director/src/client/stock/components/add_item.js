import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Form,
  Button,
  Dropdown,
  Label,
  Input,
} from 'semantic-ui-react';


const labelStyle = error => ({
  fontSize: '.92857143em',
  fontWeight: 700,
  color: error ? '#9f3a38' : 'black',
  padding: 0,
  margin: '0 0 .28571429rem 0',
});


const AddItem = ({
  brands,
  categories,
  products,
  onBrandChange,
  onCategoryChange,
  onProductChange,
  onShowAll,
  onProductSearchChange,
  onAmountChange,
  optionLoading,
  errors,
}) => (
  <Segment>
    <Form>
      <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
        <div style={labelStyle(errors.Brand !== undefined)}>Brand</div>
        <Dropdown
          placeholder="Select brand"
          fluid
          search
          selection
          options={brands}
          onChange={onBrandChange}
          loading={optionLoading.brand}
          error={errors.Brand !== undefined}
        />
      </Form.Group>
      <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
        <div style={labelStyle(errors.Brand !== undefined)}>Category</div>
        <Dropdown
          placeholder="Select category"
          fluid
          search
          selection
          options={categories}
          onChange={onCategoryChange}
          loading={optionLoading.category}
          error={errors.Category !== undefined}
        />
      </Form.Group>
      <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
        <div style={labelStyle(errors.Brand !== undefined)}>Product</div>
        <div style={{ display: 'flex' }}>
          <Dropdown
            placeholder="Select product"
            fluid
            search
            selection
            options={products}
            onChange={onProductChange}
            loading={optionLoading.product}
            error={errors.Product !== undefined}
            onSearchChange={onProductSearchChange}
          />
          <Button onClick={onShowAll} style={{ margin: '0 1rem', minWidth: '7rem' }}>Show all</Button>
        </div>
      </Form.Group>
      <Form.Input
        label="Amount"
        placeholder="Type amount of items..."
        onChange={onAmountChange}
        error={errors.Amount !== undefined}
        type="number"
        size="tiny"
      />
      <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
        <div style={labelStyle(errors.Brand !== undefined)}>In price</div>
        <Input labelPosition='right' type='text' placeholder='Amount' label="RUB" />
      </Form.Group>
      <Form.Group style={{ display: 'block', margin: '0 0 1em' }}>
        <div style={labelStyle(errors.Brand !== undefined)}>Shelf price</div>
        <Input labelPosition='right' type='text' placeholder='Amount' label="RUB" />
      </Form.Group>
    </Form>
    <Button>Add item</Button>
  </Segment>
);

AddItem.propTypes = {
  onProductChange: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShowAll: PropTypes.func.isRequired,
  onBrandChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onProductChange: PropTypes.func.isRequired,
  onProductSearchChange: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  optionLoading: PropTypes.object.isRequired,
};

export default AddItem;
