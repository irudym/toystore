import { withSwitch } from './with_switch';
import Brands from '../client/brands';
import BrandsTrash from '../client/brands_trash';
import AddBrand from '../client/containers/add_brand';
import EditBrand from '../client/containers/edit_brand';

const BrandSwitch = withSwitch({
  component: Brands,
  componentTrash: BrandsTrash,
  addComponent: AddBrand,
  editComponent: EditBrand,
  name: 'brands',
});


export default BrandSwitch;
