import { withSwitch } from './with_switch';

import Categories from '../client/categories';
import CategoriesTrash from '../client/categories_trash';
import AddCategory from '../client/containers/add_category';
import EditCategory from '../client/containers/edit_category';


const CategorySwitch = withSwitch({
  component: Categories,
  componentTrash: CategoriesTrash,
  addComponent: AddCategory,
  editComponent: EditCategory,
  name: 'categories',
});

export default CategorySwitch;
