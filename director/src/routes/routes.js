import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from '../client/dashboard';
import CategorySwitch from './category_switch';
import ColourSwitch from './colour_switch';
import MaterialSwitch from './material_switch';
import BrandSwitch from './brand_switch';


export const Routes = () => (
  <>
    <Route exact path="/director" component={Dashboard} />
    <Route path="/director/dashboard" component={Dashboard} />
    <Route path="/director/categories" component={CategorySwitch} />
    <Route path="/director/colours" component={ColourSwitch} />
    <Route path="/director/materials" component={MaterialSwitch} />
    <Route path="/director/brands" component={BrandSwitch} />
  </>
);

export default Routes;
