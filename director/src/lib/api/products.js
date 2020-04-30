import Records from './records';
import { constructError } from './errors';

const Products = Records('products');

Products.search = async ({ url, token, name, category, brand }) => {
  const response = await fetch(`${url}/products/search`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, category, brand }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw constructError(response, data);
  }
  return data;
};

export default Products;
