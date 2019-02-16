import { withSwitch } from './with_switch';
import Materials from '../client/materials';
import MaterialsTrash from '../client/materials_trash';
import AddMaterial from '../client/containers/add_material';
import EditMaterial from '../client/containers/edit_material';

const MaterialSwitch = withSwitch({
  component: Materials,
  componentTrash: MaterialsTrash,
  addComponent: AddMaterial,
  editComponent: EditMaterial,
  name: 'materials',
});


export default MaterialSwitch;
