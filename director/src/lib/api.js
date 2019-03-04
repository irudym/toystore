/**
 * API functions to admin part of the store
 * Igor Rudym (C) 2019
 */
import { constructError } from './api/errors';
import Colours from './api/colours';
import Categories from './api/categories';
import Materials from './api/materials';
import Records from './api/records';

export const loginUser = async ({ url, user }) => {
  const response = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw constructError(response, data);
  }
  return data;
};

export const colours = Colours;
export const categories = Categories;
export const materials = Materials;
export const brands = Records('brands');
export const types = Records('types');
export const products = Records('products');
