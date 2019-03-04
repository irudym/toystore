import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from '../client/dashboard';
import CategorySwitch from './category_switch';
import ColourSwitch from './colour_switch';
import MaterialSwitch from './material_switch';
import BrandSwitch from './brand_switch';
import TypeSwitch from './type_switch';
import ProductSwitch from './product_switch';


export const Routes = () => (
  <>
    <Route exact path="/director" component={Dashboard} />
    <Route path="/director/dashboard" component={Dashboard} />
    <Route path="/director/categories" component={CategorySwitch} />
    <Route path="/director/colours" component={ColourSwitch} />
    <Route path="/director/materials" component={MaterialSwitch} />
    <Route path="/director/brands" component={BrandSwitch} />
    <Route path="/director/types" component={TypeSwitch} />
    <Route path="/director/products" component={ProductSwitch} />
  </>
);

export default Routes;
