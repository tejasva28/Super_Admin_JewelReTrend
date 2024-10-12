import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdCalendarToday, // Calendar Icon for the calendar route
  MdAssessment, // Sales Icon
  MdPeople, // Team Icon
  MdShoppingBasket, // Sellers Icon
  MdDashboard, // Dashboard Icon
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
import CalendarPage from '/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/admin/calendar'; // Import the CalendarPage component
import SessionsPage from 'views/admin/sessions/index'; 
import Insurace from '/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/insurance';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SellerDetails from 'views/admin/marketplace/sellerDetails';
import { GoDeviceMobile } from 'react-icons/go';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
    sidebar: true, // Show in the sidebar
  },
  {
    name: 'Calendar',
    layout: '/admin',
    path: '/calendar',
    icon: <Icon as={MdCalendarToday} width="20px" height="20px" color="inherit" />,
    component: <CalendarPage />,
    sidebar: true, // Show in the sidebar
    secondary: true,
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
    sidebar: true, // Show in the sidebar
    secondary: true,
  },
  {
    name: 'Insurance',
    layout: '/admin',
    path: '/insurace',
    icon: <Icon as={GoDeviceMobile} width="20px" height="20px" color="inherit" />,
    component: <Insurace />,
    sidebar: true,
  },
  {
    name: 'Product Details',
    layout: '/admin',
    path: '/products/:id',
    component: <ProductDetails />,
    sidebar: false,
  },
  {
    name: 'Appraised Data',
    layout: '/admin',
    path: '/products/appraised/:id',
    component: <AppraisedDetails />,
    sidebar: false,
  },
  {
    name: 'Sellers',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdShoppingBasket}
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
    icon: <Icon as={MdAssessment} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <Sales />,
    sidebar: true, // Show in the sidebar
    secondary: true,
  },
  {
    name: 'Team',
    layout: '/admin',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    path: '/team',
    component: <Team />,
    sidebar: true, // Show in the sidebar
    secondary: true,
  },
  {
    name: 'Sessions',
    layout: '/admin',
    path: '/sessions',
    icon: <Icon as={GoDeviceMobile} width="20px" height="20px" color="inherit" />,
    component: <SessionsPage />,
    sidebar: true,
  },
];

export default routes;
