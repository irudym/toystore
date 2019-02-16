// import { Switch, Route } from 'react-router-dom';

import { withSwitch } from './with_switch';
import Colours from '../client/colours';
import ColoursTrash from '../client/colours_trash';
import AddColour from '../client/containers/add_colour';
import EditColour from '../client/containers/edit_colour';

const ColourSwitch = withSwitch({
  component: Colours,
  componentTrash: ColoursTrash,
  addComponent: AddColour,
  editComponent: EditColour,
  name: 'colours',
});


export default ColourSwitch;
