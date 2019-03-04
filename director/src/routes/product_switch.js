import { withSwitch } from './with_switch';
import Products from '../client/products/products';
import ProductsTrash from '../client/products/products_trash';
import AddProduct from '../client/products/containers/add_product';
import EditProduct from '../client/products/containers/edit_product';

const ProductSwitch = withSwitch({
  component: Products,
  componentTrash: ProductsTrash,
  addComponent: AddProduct,
  editComponent: EditProduct,
  name: 'products',
});


export default ProductSwitch;
