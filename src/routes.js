import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import Sales from 'views/admin/Sales';
import Team from 'views/admin/team';
import ProductDetails from 'views/admin/products/ProductDetails';
import AppraisedDetails from './views/admin/products/AppraisedDetails';
import Products from 'views/admin/products';
import AppraiserTable from 'views/admin/team/components/AppraiserTable';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SellerDetails from 'views/admin/marketplace/sellerDetails';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    sidebar: false,
  },
  {
    name: 'Products',
    layout: '/admin',
    path: '/products',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Products />,
    secondary: true,
  },
  
  {
    name: 'Product Details',
    layout: '/admin',
    path: '/products/:id',
    component: <ProductDetails />,
    sidebar: false, // Ensure this is set to false
  },


  {
    name: 'Appraised Data',
    layout: '/admin',
    path: '/products/appraised/:id',
    component: <AppraisedDetails />,
  },
  // {
  //   name: 'Sellers Data',
  //   layout: '/admin',
  //   path: '/products/sellers/:id',
  //   component: <SellerDetails />,
  // },
  {
    name: 'Sellers',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Sales',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <Sales />,
    sidebar: false,
    secondary: true,
  },
  {
    name: 'Team',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/team',
    component: <Team />,
    sidebar: false,
    secondary: true,
  },
  // {
  //   name: 'Appraisers',
  //   layout: '/admin',
  //   path: '/Appraiser/:id',
  //   component: <AppraisedDetails />,
  //   sidebar: false, // Ensure this is set to false
  // },
  
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: <Profile />,
  // },
  
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: <SignInCentered />,
  // },
  
];

export default routes;