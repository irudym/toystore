import React from 'react';

import Sidebar from './client/components/sidebar';
import Routes from './routes/routes';

const sideMenuItems = [
  {
    id: 100,
    title: 'Dashboard',
    link: '/director/dashboard',
    icon: 'dashboard',
  },
  {
    id: 101,
    title: 'Categories',
    link: '/director/categories',
    icon: 'clone outline',
  },
  {
    id: 102,
    title: 'Colours',
    link: '/director/colours',
    icon: 'paint brush',
  },
  {
    id: 103,
    title: 'Materials',
    link: '/director/materials',
    icon: 'box',
  },
  {
    id: 104,
    title: 'Brands',
    link: '/director/brands',
    icon: 'eye',
  },
  {
    id: 105,
    title: 'Types',
    link: '/director/types',
    icon: 'tag',
  },
  {
    id: 106,
    title: 'Products',
    link: '/director/products',
    icon: 'fly',
  },
];

const Director = () => (
  <div>
    <Sidebar menuItems={sideMenuItems} />
    <Routes />
  </div>
);

export default Director;
