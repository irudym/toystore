import { withSwitch } from './with_switch';
import Types from '../client/types';
import TypesTrash from '../client/types_trash';
import AddType from '../client/containers/add_type';
import EditType from '../client/containers/edit_type';

const TypeSwitch = withSwitch({
  component: Types,
  componentTrash: TypesTrash,
  addComponent: AddType,
  editComponent: EditType,
  name: 'types',
});


export default TypeSwitch;
